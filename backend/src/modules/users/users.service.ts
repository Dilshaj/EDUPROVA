import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../database/schemas/user.schema.js';
import { CloudinaryService } from '../../infrastructure/storage/cloudinary.service.js';
import { blindIndex } from '../../shared/utils/encryption.util.js';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private cloudinaryService: CloudinaryService
    ) { }

    async findById(id: string): Promise<UserDocument> {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        const emailHash = blindIndex(email);
        return this.userModel.findOne({ emailHash });
    }

    async updateProfile(id: string, updateData: Partial<User>, fileBuffer?: Buffer | null): Promise<UserDocument> {
        console.log('UsersService: updateProfile called', {
            userId: id,
            fields: Object.keys(updateData),
            hasFile: !!fileBuffer,
            fileSize: fileBuffer?.length
        });

        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Handle text fields
        if (updateData.dob) user.dob = updateData.dob;
        if (updateData.gender) user.gender = updateData.gender;
        if (updateData.address) user.address = updateData.address;
        if (updateData.bio) user.bio = updateData.bio;

        // Allow updating phone number
        if (updateData.phoneNumber) {
            console.log('UsersService: Updating phone number');
            user.phoneNumber = updateData.phoneNumber;
        }

        // Handle avatar upload
        if (fileBuffer) {
            // Check if Cloudinary is configured
            const hasCloudinaryConfig = process.env.CLOUDINARY_CLOUD_NAME &&
                process.env.CLOUDINARY_API_KEY &&
                process.env.CLOUDINARY_API_SECRET;

            if (!hasCloudinaryConfig) {
                console.warn('UsersService: Cloudinary not configured - skipping image upload');
                console.warn('UsersService: Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your .env file');
                // Skip upload but don't fail the entire request
            } else {
                try {
                    console.log('UsersService: Starting Cloudinary upload with 30s timeout...');

                    // Create a timeout promise
                    const timeoutPromise = new Promise((_, reject) =>
                        setTimeout(() => reject(new Error('Upload timeout - taking too long')), 30000)
                    );

                    // Race between upload and timeout
                    const uploadResult = await Promise.race([
                        this.cloudinaryService.uploadImage(fileBuffer, 'avatars'),
                        timeoutPromise
                    ]) as any;

                    console.log('UsersService: Cloudinary upload successful', { url: uploadResult.secure_url });
                    user.avatar = uploadResult.secure_url;
                } catch (error: any) {
                    console.error('UsersService: Cloudinary upload failed', {
                        message: error.message,
                        name: error.name,
                        code: error.code
                    });
                    throw new BadRequestException('Failed to upload profile image: ' + error.message);
                }
            }
        } else if ((updateData as any).avatar === "") {
            // Handle specifically sent avatar removal signal
            console.log('UsersService: Removing avatar');
            user.avatar = "";
        }

        // Using .save() to ensure encryption middleware triggers
        console.log('UsersService: Saving user to database...');
        await user.save();
        console.log('UsersService: Profile updated successfully');

        return user;
    }

    async getTeamMembers() {
        const teamMembers = await this.userModel.find({
            role: { $in: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'MONITOR'] }
        }).select('firstName lastName email role avatar createdAt').sort({ createdAt: -1 });

        return teamMembers.map(member => ({
            id: member._id,
            name: `${member.firstName} ${member.lastName}`,
            email: member.email,
            role: member.role,
            avatar: member.avatar,
            status: 'active',
            joinedAt: (member as any).createdAt,
        }));
    }
}

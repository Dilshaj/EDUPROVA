import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../database/schemas/user.schema.js';
import { CloudinaryService } from '../../infrastructure/storage/cloudinary.service.js';
import { blindIndex } from '../../shared/utils/encryption.util.js';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private cloudinaryService: CloudinaryService,
        @Inject('MAIL_TRANSPORTER') private mailTransporter: any
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

    async removeTeamMember(id: string, currentUserId: string) {
        if (id === currentUserId) {
            throw new BadRequestException('You cannot remove your own account from the team');
        }

        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.role === 'SUPER_ADMIN') {
            throw new BadRequestException('Cannot remove a Super Admin');
        }

        // Get email before deletion for the notice
        const userEmail = user.email;
        const userName = `${user.firstName} ${user.lastName}`;

        // Send email before deletion
        try {
            await this.mailTransporter.sendMail({
                to: userEmail,
                subject: 'Account Removal Notice - Eduprova',
                html: `
                    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
                        <div style="background: linear-gradient(to right, #0066FF, #E056FD); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
                            <h1 style="color: white; margin: 0; font-size: 24px;">Eduprova Team Access</h1>
                        </div>
                        <div style="padding: 30px; background: #fff; border: 1px solid #eee; border-radius: 0 0 12px 12px;">
                            <p style="font-size: 16px;">Hello <strong>${userName}</strong>,</p>
                            <p>This is an official notice that your account for <strong>${userEmail}</strong> has been removed from the Eduprova team by an administrator.</p>
                            <div style="background: #FFF2F2; border-left: 4px solid #FF4D4F; padding: 15px; margin: 20px 0;">
                                <p style="color: #666; font-size: 14px; margin: 0;">
                                    <strong>Immediate Action Taken:</strong> Your account data has been permanently removed from our database, and your access to the dashboard has been revoked.
                                </p>
                            </div>
                            <p>If you believe this action was taken in error or if you have any questions, please contact your team administrator immediately.</p>
                            <p style="margin-top: 30px; font-size: 14px; color: #888;">Best regards,<br>The Eduprova System Team</p>
                        </div>
                        <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
                            <p>&copy; 2026 Eduprova. All rights reserved.</p>
                        </div>
                    </div>
                `
            });
            console.log(`Removal notice email sent to: ${userEmail}`);
        } catch (error) {
            console.error('Error sending removal notice email:', error);
            // Proceed with deletion even if email fails to ensure data integrity
        }

        await this.userModel.findByIdAndDelete(id);
        return { message: 'Team member removed and account permanently deleted' };
    }
}

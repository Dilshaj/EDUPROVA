import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../database/schemas/user.schema.js';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import twilio from 'twilio';
import { blindIndex } from '../../shared/utils/encryption.util.js';
import { InviteService } from '../invite/invite.service.js';

@Injectable()
export class AuthService {
    private twilioClient?: any;
    private verifyServiceSid?: string;

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private configService: ConfigService,
        private jwtService: JwtService,
        private inviteService: InviteService
    ) {
        const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
        const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
        const verifySid = this.configService.get<string>('TWILIO_VERIFY_SERVICE_SID');

        if (accountSid && authToken && verifySid) {
            this.twilioClient = twilio(accountSid, authToken);
            this.verifyServiceSid = verifySid;
        }
    }

    private formatPhoneNumber(phone: string): string {
        // Remove all non-digit characters except leading +
        const cleaned = phone.replace(/[^\d+]/g, '');

        if (cleaned.startsWith('+')) {
            return cleaned;
        }

        // Default to India (+91) if it's a 10-digit number
        if (cleaned.length === 10) {
            return `+91${cleaned}`;
        }

        // If it looks like it has a country code but no +
        return `+${cleaned}`;
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const hash = blindIndex(email);
        console.log(`Validating user: ${email}, Hash: ${hash}`);
        const user = await this.userModel.findOne({ emailHash: hash }).select('+password');

        if (!user) {
            console.log('User not found in database');
            return null;
        }

        console.log(`User found: ${user.email}, Role: ${user.role}`);

        if (user.password && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user.toObject();
            return result;
        }

        console.log('Password mismatch');
        return null;
    }

    async login(user: any) {
        const payload = {
            email: user.email,
            sub: (user._id || user.id).toString(),
            role: user.role
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user._id || user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                avatar: user.avatar
            }
        };
    }

    async register(userDetails: any) {
        const existingUser = await this.userModel.findOne({ emailHash: blindIndex(userDetails.email) });
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(userDetails.password, 10);
        const newUser = new this.userModel({
            ...userDetails,
            password: hashedPassword,
            role: 'STUDENT', // Force role to STUDENT for self-registration
        });
        return newUser.save();
    }

    async acceptInvite(data: any) {
        const invite = await this.inviteService.validateInvite(data.token);

        const existingUser = await this.userModel.findOne({ emailHash: blindIndex(invite.email) });
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = new this.userModel({
            firstName: data.firstName,
            lastName: data.lastName,
            email: invite.email,
            password: hashedPassword,
            role: invite.role, // Use role from invite
        });

        const savedUser = await newUser.save();
        await this.inviteService.markAsUsed(invite.tokenHash);
        return savedUser;
    }

    async socialLogin(profile: any) {
        let user = await this.userModel.findOne({ emailHash: blindIndex(profile.email) });

        if (!user) {
            user = new this.userModel({
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email,
                googleId: profile.googleId,
                avatar: profile.avatar,
                role: 'STUDENT',
            });
            await user.save();
        } else if (!user.googleIdHash) {
            user.googleId = profile.googleId;
            if (!user.avatar) user.avatar = profile.avatar;
            await user.save();
        }

        return user;
    }

    async findByEmail(email: string) {
        return this.userModel.findOne({ emailHash: blindIndex(email) });
    }

    async sendOtp(phone: string) {
        if (!phone || phone.length < 10) {
            throw new UnauthorizedException('Please enter a valid 10-digit mobile number');
        }

        const formattedPhone = this.formatPhoneNumber(phone);
        const { twilioClient, verifyServiceSid } = this;

        if (!twilioClient || !verifyServiceSid) {
            console.log(`Twilio not configured. Stub OTP for ${formattedPhone}`);
            return { success: true, message: 'OTP sent (Stub)' };
        }

        try {
            await twilioClient.verify.v2.services(verifyServiceSid)
                .verifications
                .create({ to: formattedPhone, channel: 'sms' });
            return { success: true, message: 'OTP sent successfully' };
        } catch (error: any) {
            console.error('Twilio Send OTP Error:', error);
            const message = error.code === 21211 ? 'The phone number is invalid' : 'Failed to send OTP. Please try again later.';
            throw new UnauthorizedException(message);
        }
    }

    async verifyPreLogin(phone: string, otp: string) {
        if (!otp || otp.length < 4) {
            throw new UnauthorizedException('Please enter a valid OTP');
        }

        const formattedPhone = this.formatPhoneNumber(phone);
        const { twilioClient, verifyServiceSid } = this;

        if (!twilioClient || !verifyServiceSid) {
            console.log(`Twilio not configured. Stub verification for ${formattedPhone}`);
            const user = await this.userModel.findOne({ phoneHash: blindIndex(formattedPhone) });
            return {
                success: true,
                verified: true,
                userExists: !!user,
            };
        }

        try {
            const verification = await twilioClient.verify.v2.services(verifyServiceSid)
                .verificationChecks
                .create({ to: formattedPhone, code: otp });

            if (verification.status !== 'approved') {
                return { success: false, error: 'Invalid or expired OTP. Please try again.' };
            }

            const user = await this.userModel.findOne({ phoneHash: blindIndex(formattedPhone) });
            return {
                success: true,
                verified: true,
                userExists: !!user,
            };
        } catch (error) {
            console.error('Twilio Verify OTP Error:', error);
            throw new UnauthorizedException('Invalid OTP or verification session expired');
        }
    }
}

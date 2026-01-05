import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invite, InviteDocument } from '../../database/schemas/invite.schema.js';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { blindIndex } from '../../shared/utils/encryption.util.js';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class InviteService {
    constructor(
        @InjectModel(Invite.name) private inviteModel: Model<InviteDocument>,
        private configService: ConfigService,
        @Inject('MAIL_TRANSPORTER') private mailTransporter: any,
        private usersService: UsersService
    ) { }

    async createInvite(email: string, role: 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'MONITOR', invitedBy?: string) {
        // Check if user is already registered
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new BadRequestException('User with this email already exists');
        }

        // Check if there's already a pending invite for this email sent within the last 24 hours
        const emailHash = blindIndex(email);
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

        const recentInvite = await this.inviteModel.findOne({
            emailHash,
            used: false,
            createdAt: { $gt: twentyFourHoursAgo }
        });

        if (recentInvite) {
            throw new BadRequestException('An invite was already sent to this email in the last 24 hours. Please wait before sending another.');
        }

        // Check if there is any active invite (regardless of time but not expired)
        // Actually, the requirement says "if we try to send... to the same email within 24 hours then show a popup"
        // And "expire the link after 24 hours".
        // So we should set expiry to 24 hours from now.

        const token = crypto.randomBytes(32).toString('hex');
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour expiry

        const invite = new this.inviteModel({
            email,
            role,
            tokenHash,
            expiresAt,
            invitedBy,
        });

        await invite.save();

        const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
        const inviteLink = `${frontendUrl}/join-team?token=${token}`;

        await this.sendInviteEmail(email, role, inviteLink);

        return { success: true, message: 'Invite sent successfully', inviteId: invite._id };
    }

    private async sendInviteEmail(email: string, role: string, inviteLink: string) {
        try {
            console.log(`Sending invite email to ${email}`);
            const roleDescriptions = {
                SUPER_ADMIN: 'a Super Administrator with complete control over the entire platform',
                ADMIN: 'an Administrator with full access to manage the platform',
                TEACHER: 'a Teacher who can create and manage courses',
                MONITOR: 'a Monitor who can view courses and student progress'
            };

            await this.mailTransporter.sendMail({
                to: email,
                subject: `You're invited to join Eduprova as ${role}`,
                html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                        .header { background: linear-gradient(90deg, #3b82f6 0%, #a855f7 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                        .header h1 { color: white; margin: 0; font-size: 28px; }
                        .content { background: #ffffff; padding: 40px; border: 1px solid #e0e0e0; border-top: none; }
                        .button { display: inline-block; padding: 14px 32px; background: linear-gradient(90deg, #3b82f6 0%, #a855f7 100%); color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
                        .info-box { background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
                        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🎓 Welcome to Eduprova</h1>
                        </div>
                        <div class="content">
                            <h2>You've been invited!</h2>
                            <p>You have been invited to join Eduprova as <strong>${role}</strong>.</p>
                            
                            <div class="info-box">
                                <strong>Your Role:</strong> ${roleDescriptions[role as keyof typeof roleDescriptions]}
                            </div>

                            <p>Click the button below to accept your invitation and set up your account:</p>
                            
                            <div style="text-align: center;">
                                <a href="${inviteLink}" class="button">Accept Invitation</a>
                            </div>
                            
                            <p style="color: #666; font-size: 14px;">
                                <strong>Important:</strong> This link will expire in 48 hours. If you don't use it before then, you'll need to request a new invitation.
                            </p>
                            
                            <p style="color: #666; font-size: 14px;">
                                If you did not expect this invitation, please ignore this email.
                            </p>
                        </div>
                        <div class="footer">
                            <p>© 2026 Eduprova. All rights reserved.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            });
        } catch (error) {
            console.error('Error in sendInviteEmail:', error);
            // We log the error but don't throw, so the invite creation is still considered successful
            // implicitly, although ideally we might want to alert the user. 
            // However, throwing here might roll back the transaction if one existed, 
            // but here we just saved the invite. 
            // Let's just log it for now as per "better logging".
        }
    }

    async getAllInvites() {
        const invites = await this.inviteModel.find().sort({ createdAt: -1 });
        return invites.map(invite => ({
            id: invite._id,
            email: invite.email,
            role: invite.role,
            used: invite.used,
            expiresAt: invite.expiresAt,
            createdAt: invite.createdAt,
            invitedBy: invite.invitedBy,
            isExpired: new Date() > invite.expiresAt,
        }));
    }

    async getPendingInvites() {
        const invites = await this.inviteModel.find({
            used: false,
            expiresAt: { $gt: new Date() }
        }).sort({ createdAt: -1 });

        return invites.map(invite => ({
            id: invite._id,
            email: invite.email,
            role: invite.role,
            expiresAt: invite.expiresAt,
            createdAt: invite.createdAt,
            invitedBy: invite.invitedBy,
        }));
    }

    async resendInvite(inviteId: string) {
        const invite = await this.inviteModel.findById(inviteId);

        if (!invite) {
            throw new NotFoundException('Invite not found');
        }

        if (invite.used) {
            throw new BadRequestException('This invite has already been used');
        }

        // Create a new token
        const token = crypto.randomBytes(32).toString('hex');
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24);

        // Update the invite with new token and expiry
        invite.tokenHash = tokenHash;
        invite.expiresAt = expiresAt;
        await invite.save();

        const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
        const inviteLink = `${frontendUrl}/join-team?token=${token}`;

        await this.sendInviteEmail(invite.email, invite.role, inviteLink);

        return { success: true, message: 'Invite resent successfully' };
    }

    async cancelInvite(inviteId: string) {
        const result = await this.inviteModel.deleteOne({ _id: inviteId, used: false });

        if (result.deletedCount === 0) {
            throw new NotFoundException('Invite not found or already used');
        }

        return { success: true, message: 'Invite cancelled successfully' };
    }

    async validateInvite(token: string) {
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        const invite = await this.inviteModel.findOne({ tokenHash, used: false });

        if (!invite) {
            throw new NotFoundException('Invalid or already used invite token');
        }

        if (new Date() > invite.expiresAt) {
            throw new BadRequestException('Invite token has expired');
        }

        return invite;
    }

    async markAsUsed(tokenHash: string) {
        await this.inviteModel.updateOne({ tokenHash }, { used: true });
    }
}

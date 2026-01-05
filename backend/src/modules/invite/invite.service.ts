import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invite, InviteDocument } from '../../database/schemas/invite.schema.js';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class InviteService {
    constructor(
        @InjectModel(Invite.name) private inviteModel: Model<InviteDocument>,
        private configService: ConfigService,
        @Inject('MAIL_TRANSPORTER') private mailTransporter: any
    ) { }

    async createInvite(email: string, role: 'TEACHER' | 'MONITOR') {
        const token = crypto.randomBytes(32).toString('hex');
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 48); // 48 hour expiry

        const invite = new this.inviteModel({
            email,
            role,
            tokenHash,
            expiresAt,
        });

        await invite.save();

        const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
        const inviteLink = `${frontendUrl}/invite/${role.toLowerCase()}?token=${token}`;

        await this.mailTransporter.sendMail({
            to: email,
            subject: `Invitation to join Eduprova as ${role}`,
            html: `
                <h1>Welcome to Eduprova</h1>
                <p>You have been invited to join our platform as a <strong>${role}</strong>.</p>
                <p>Click the link below to set up your account and password:</p>
                <a href="${inviteLink}" style="display:inline-block;padding:12px 24px;background-color:#0066FF;color:white;text-decoration:none;border-radius:8px;font-weight:bold;">Accept Invitation</a>
                <p>This link will expire in 48 hours.</p>
                <p>If you did not expect this invitation, please ignore this email.</p>
            `,
        });

        return { success: true, message: 'Invite sent successfully' };
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

import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { InviteService } from './invite.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@Controller('invite')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InviteController {
    constructor(private readonly inviteService: InviteService) { }

    @Roles('ADMIN')
    @Post('send')
    async sendInvite(@Body() body: { email: string; role: 'TEACHER' | 'MONITOR' }) {
        return this.inviteService.createInvite(body.email, body.role);
    }
}

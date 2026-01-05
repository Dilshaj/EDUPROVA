import { Controller, Post, Body, UseGuards, Get, Param, Delete, Req } from '@nestjs/common';
import { InviteService } from './invite.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@Controller('invite')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InviteController {
    constructor(private readonly inviteService: InviteService) { }

    @Roles('ADMIN', 'SUPER_ADMIN')
    @Post('send')
    async sendInvite(@Body() body: { email: string; role: 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'MONITOR' }, @Req() req: any) {
        const invitedBy = req.user?.email || req.user?.userId;
        return this.inviteService.createInvite(body.email, body.role, invitedBy);
    }

    @Roles('ADMIN')
    @Get('list')
    async getAllInvites() {
        return this.inviteService.getAllInvites();
    }

    @Roles('ADMIN')
    @Get('pending')
    async getPendingInvites() {
        return this.inviteService.getPendingInvites();
    }

    @Roles('ADMIN')
    @Post('resend/:id')
    async resendInvite(@Param('id') id: string) {
        return this.inviteService.resendInvite(id);
    }

    @Roles('ADMIN')
    @Delete('cancel/:id')
    async cancelInvite(@Param('id') id: string) {
        return this.inviteService.cancelInvite(id);
    }
}

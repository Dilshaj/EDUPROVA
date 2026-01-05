import { Controller, Post, Body, Get, Param, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('auth/register')
    async register(@Body() userDetails: any) {
        return this.authService.register(userDetails);
    }

    @Post('auth/login')
    async login(@Body() credentials: any) {
        const user = await this.authService.validateUser(credentials.email, credentials.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @Post('auth/social-login')
    async socialLogin(@Body() profile: any) {
        const user = await this.authService.socialLogin(profile);
        return this.authService.login(user);
    }

    @Post('otp/phone/send-otp')
    async sendOtp(@Body('phoneNumber') phoneNumber: string) {
        console.log('AuthController: Send OTP request for', phoneNumber);
        return this.authService.sendOtp(phoneNumber);
    }

    @Post('auth/verify-pre-login')
    async verifyPreLogin(@Body() data: { phoneNumber: string; otp: string }) {
        console.log('AuthController: Verify OTP request for', data.phoneNumber);
        return this.authService.verifyPreLogin(data.phoneNumber, data.otp);
    }

    @Post('auth/accept-invite')
    async acceptInvite(@Body() body: any) {
        return this.authService.acceptInvite(body);
    }

    @Get('auth/profile/:email')
    async getProfile(@Param('email') email: string) {
        const user = await this.authService.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return user;
    }
}

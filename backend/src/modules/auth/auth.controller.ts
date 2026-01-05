import { Controller, Post, Body, Get, Param, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { Public } from './decorators/public.decorator.js';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Post('auth/register')
    async register(@Body() userDetails: any) {
        return this.authService.register(userDetails);
    }

    @Public()
    @Post('auth/login')
    async login(@Body() credentials: any) {
        const user = await this.authService.validateUser(credentials.email, credentials.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @Public()
    @Post('auth/social-login')
    async socialLogin(@Body() profile: any) {
        const user = await this.authService.socialLogin(profile);
        return this.authService.login(user);
    }

    @Public()
    @Post('otp/phone/send-otp')
    async sendOtp(@Body('phoneNumber') phoneNumber: string, @Body() body: any) {
        console.log('========================================');
        console.log('AuthController: Send OTP endpoint HIT');
        console.log('Phone Number:', phoneNumber);
        console.log('Full Body:', body);
        console.log('========================================');
        return this.authService.sendOtp(phoneNumber);
    }

    @Public()
    @Post('auth/verify-pre-login')
    async verifyPreLogin(@Body() data: { phoneNumber: string; otp: string }) {
        console.log('AuthController: Verify OTP request for', data.phoneNumber);
        return this.authService.verifyPreLogin(data.phoneNumber, data.otp);
    }

    @Public()
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

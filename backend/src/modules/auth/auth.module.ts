import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { User, UserSchema } from '../../database/schemas/user.schema.js';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import { InviteModule } from '../invite/invite.module.js';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        PassportModule,
        InviteModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                const secret = config.get<string>('JWT_SECRET') || 'eduprova-jwt-development-secret-key-2024';
                console.log('AuthModule - Using secret length:', secret.length);
                return {
                    secret: secret,
                    signOptions: { expiresIn: '7d' },
                };
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService, JwtModule],
})
export class AuthModule { }

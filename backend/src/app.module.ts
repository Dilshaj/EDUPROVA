import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { RedisModule } from './infrastructure/redis/redis.module.js';
import { StorageModule } from './infrastructure/storage/storage.module.js';
import { HealthModule } from './modules/health/health.module.js';
import { SocketModule } from './modules/socket/socket.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { MailModule } from './infrastructure/mail/mail.module.js';
import { InviteModule } from './modules/invite/invite.module.js';
import { SeedModule } from './modules/seed/seed.module.js';
import { UsersModule } from './modules/users/users.module.js';
import { CoursesModule } from './modules/courses/courses.module.js';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/eduprova'),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100, // Limit to 100 requests per minute
    }]),
    RedisModule,
    StorageModule,
    HealthModule,
    SocketModule,
    AuthModule,
    MailModule,
    InviteModule,
    SeedModule,
    UsersModule,
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }
  ],
})
export class AppModule { }

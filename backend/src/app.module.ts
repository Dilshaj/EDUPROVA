import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
// import { RedisModule } from './infrastructure/redis/redis.module.js';
import { StorageModule } from './infrastructure/storage/storage.module.js';
import { HealthModule } from './modules/health/health.module.js';
import { SocketModule } from './modules/socket/socket.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { MailModule } from './infrastructure/mail/mail.module.js';
import { InviteModule } from './modules/invite/invite.module.js';
import { SeedModule } from './modules/seed/seed.module.js';
import { UsersModule } from './modules/users/users.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/eduprova'),
    // RedisModule,
    StorageModule,
    HealthModule,
    SocketModule,
    AuthModule,
    MailModule,
    InviteModule,
    SeedModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

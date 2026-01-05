import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Invite, InviteSchema } from '../../database/schemas/invite.schema.js';
import { InviteService } from './invite.service.js';
import { InviteController } from './invite.controller.js';
import { UsersModule } from '../users/users.module.js';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Invite.name, schema: InviteSchema }]),
        UsersModule,
    ],
    providers: [InviteService],
    controllers: [InviteController],
    exports: [InviteService],
})
export class InviteModule { }

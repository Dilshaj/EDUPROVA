import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Invite, InviteSchema } from '../../database/schemas/invite.schema.js';
import { InviteService } from './invite.service.js';
import { InviteController } from './invite.controller.js';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Invite.name, schema: InviteSchema }]),
    ],
    providers: [InviteService],
    controllers: [InviteController],
    exports: [InviteService],
})
export class InviteModule { }

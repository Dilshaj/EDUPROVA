import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InviteDocument = Invite & Document;

@Schema({ timestamps: true })
export class Invite {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true, enum: ['TEACHER', 'MONITOR'] })
    role: string;

    @Prop({ required: true, unique: true, index: true })
    tokenHash: string;

    @Prop({ required: true })
    expiresAt: Date;

    @Prop({ default: false })
    used: boolean;
}

export const InviteSchema = SchemaFactory.createForClass(Invite);

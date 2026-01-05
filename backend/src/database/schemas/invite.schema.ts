import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { blindIndex } from '../../shared/utils/encryption.util.js';

export type InviteDocument = Invite & Document;

@Schema({ timestamps: true })
export class Invite {
    @Prop({ required: true })
    email: string;

    @Prop({ index: true })
    emailHash: string;

    @Prop({ required: true, enum: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'MONITOR'] })
    role: string;

    @Prop({ required: true, unique: true, index: true })
    tokenHash: string;

    @Prop({ required: true })
    expiresAt: Date;

    @Prop({ default: false })
    used: boolean;

    @Prop()
    invitedBy?: string;

    createdAt?: Date;
    updatedAt?: Date;
}

export const InviteSchema = SchemaFactory.createForClass(Invite);

// Pre-save hook to generate emailHash
InviteSchema.pre('save', async function () {
    if (this.isModified('email') || this.isNew) {
        this.emailHash = blindIndex(this.email);
    }
});

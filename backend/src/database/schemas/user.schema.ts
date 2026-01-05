import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { encrypt, decrypt, blindIndex } from '../../shared/utils/encryption.util.js';

export type UserDocument = User & Document;

@Schema({
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true }
})
export class User {
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({
        required: true,
        unique: true,
        get: (val: string) => decrypt(val)
    })
    email: string;

    @Prop({ unique: true, index: true })
    emailHash: string;

    @Prop()
    password?: string;

    @Prop({
        unique: true,
        sparse: true,
        get: (val: string) => decrypt(val)
    })
    phoneNumber?: string;

    @Prop({ sparse: true, index: true })
    phoneHash: string;

    @Prop({ default: 'STUDENT' })
    role: string;

    @Prop({
        get: (val: string) => decrypt(val)
    })
    googleId?: string;

    @Prop({ sparse: true, index: true })
    googleIdHash?: string;

    @Prop()
    avatar?: string;

    @Prop()
    dob?: string;

    @Prop()
    gender?: string;

    @Prop()
    address?: string;

    @Prop()
    bio?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Middleware to handle encryption and hashing before saving
UserSchema.pre('save', async function () {
    const user = this as any;

    if (user.isModified('email')) {
        const plainEmail = user.email;
        user.emailHash = blindIndex(plainEmail);
        user.email = encrypt(plainEmail);
    }

    if (user.isModified('phoneNumber')) {
        const plainPhone = user.phoneNumber;
        if (plainPhone) {
            user.phoneHash = blindIndex(plainPhone);
            user.phoneNumber = encrypt(plainPhone);
        } else {
            user.phoneHash = undefined;
        }
    }

    if (user.isModified('googleId')) {
        const plainGoogleId = user.googleId;
        if (plainGoogleId) {
            user.googleIdHash = blindIndex(plainGoogleId);
            user.googleId = encrypt(plainGoogleId);
        } else {
            user.googleIdHash = undefined;
        }
    }
});

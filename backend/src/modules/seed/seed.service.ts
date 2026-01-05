import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../database/schemas/user.schema.js';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { blindIndex } from '../../shared/utils/encryption.util.js';

@Injectable()
export class SeedService implements OnModuleInit {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private configService: ConfigService,
    ) { }

    async onModuleInit() {
        await this.seedAdmin();
    }

    private async seedAdmin() {
        const adminEmail = this.configService.get<string>('ADMIN_EMAIL') || 'admin@eduprova.com';
        const adminPass = this.configService.get<string>('ADMIN_PASSWORD') || 'Admin@123';

        console.log(`Checking for admin account: ${adminEmail}`);
        const adminExists = await this.userModel.findOne({ emailHash: blindIndex(adminEmail) });

        if (!adminExists) {
            console.log('Admin account not found. Seeding...');
            const hashedPassword = await bcrypt.hash(adminPass, 10);
            const admin = new this.userModel({
                firstName: 'System',
                lastName: 'Admin',
                email: adminEmail,
                password: hashedPassword,
                role: 'ADMIN',
            });
            await admin.save();
            console.log(`Admin account seeded successfully: ${adminEmail}`);
        } else {
            console.log(`Admin account already exists: ${adminExists.email}`);
            // Ensure the role is ADMIN (in case it was manually registered as student)
            if (adminExists.role !== 'ADMIN') {
                console.log('Updating role to ADMIN for existing user...');
                adminExists.role = 'ADMIN';
                await adminExists.save();
                console.log('Role updated to ADMIN successfully.');
            }
        }
    }
}

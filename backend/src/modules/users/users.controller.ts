import { Controller, Get, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('profile')
    async getProfile(@Req() req) {
        const user = await this.usersService.findById(req.user.userId);
        return user.toObject({ getters: true });
    }

    @Patch('profile')
    async updateProfile(@Req() req) {
        try {
            console.log('UsersController: updateProfile call received');
            const parts = req.parts();
            const updateData: any = {};
            let fileBuffer: Buffer | null = null;

            for await (const part of parts) {
                if (part.file) {
                    console.log('UsersController: Found file part', {
                        filename: part.filename,
                        mimetype: part.mimetype,
                        encoding: part.encoding
                    });

                    // IMPORTANT: Consume the stream immediately!
                    console.log('UsersController: Reading file stream...');
                    const chunks: Buffer[] = [];
                    for await (const chunk of part.file) {
                        chunks.push(chunk);
                    }
                    fileBuffer = Buffer.concat(chunks);
                    console.log('UsersController: File buffer created, size:', fileBuffer.length);
                } else {
                    console.log(`UsersController: Found field ${part.fieldname} = ${part.value}`);
                    updateData[part.fieldname] = part.value;
                }
            }

            console.log('UsersController: All parts processed. Calling UsersService...');
            const result = await this.usersService.updateProfile(req.user.userId, updateData, fileBuffer);
            console.log('UsersController: Update complete');
            return result;
        } catch (error) {
            console.error('UsersController: Error in updateProfile:', error);
            throw error;
        }
    }
}

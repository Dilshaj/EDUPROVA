import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Global()
@Module({
    providers: [
        {
            provide: 'MAIL_TRANSPORTER',
            useFactory: (configService: ConfigService) => {
                const host = configService.get<string>('MAIL_HOST');
                const port = configService.get<number>('MAIL_PORT');
                const user = configService.get<string>('MAIL_USER');
                const pass = configService.get<string>('MAIL_PASS');

                if (!host || !user || !pass) {
                    console.log('Mail service not fully configured. Using stub.');
                    return {
                        sendMail: async (options: any) => {
                            console.log('--- STUB EMAIL SENT ---');
                            console.log('To:', options.to);
                            console.log('Subject:', options.subject);
                            console.log('Body:', options.html || options.text);
                            console.log('-----------------------');
                            return { messageId: 'stub-id' };
                        }
                    };
                }

                return nodemailer.createTransport({
                    host,
                    port: port || 587,
                    secure: port === 465,
                    auth: { user, pass },
                });
            },
            inject: [ConfigService],
        },
    ],
    exports: ['MAIL_TRANSPORTER'],
})
export class MailModule { }

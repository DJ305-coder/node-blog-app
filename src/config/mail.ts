import dotenv from 'dotenv';

dotenv.config();

interface MailConfig {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        pass: string;
    };
}

export const mailConfig: MailConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com', 
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    secure: process.env.SSL === 'true',
    auth: {
      user: process.env.SMTP_USER || '', 
      pass: process.env.SMTP_PASS || '', 
    },
};
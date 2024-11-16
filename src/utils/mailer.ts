import nodemailer from 'nodemailer';
import { mailConfig } from '../config/mail';

const transporter = nodemailer.createTransport(mailConfig);

export const sendMail = async (to: string, subject: string, text: string) =>{
    const mailOptions = {
        from: mailConfig.auth.user,
        to,
        subject,
        text
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}
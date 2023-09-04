import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'Gmail', // Utilisez votre service de messagerie préféré
            auth: {
                user: 'emjikbelmous@gmail.com',
                pass: 'upffsutdvljumqkw',
            },
        });
    }

    async sendEmail(to: string, subject: string, text: string) {
        const mailOptions = {
          from: 'emjikbelmous@gmail.com',
          to,
          subject,
          text,
        };
    
        return this.transporter.sendMail(mailOptions);
      }
}

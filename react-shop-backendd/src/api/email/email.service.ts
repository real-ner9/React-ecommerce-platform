import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";

@Injectable()
export class EmailService {
  private nodemailerTransport: Mail;

  constructor(
    private readonly configService: ConfigService
  ) {
    const smtpHost = configService.get<string>('SMTP_HOST');
    const smtpPort = configService.get<number>('SMTP_PORT') ?? 587;

    this.nodemailerTransport = createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: configService.get<string>('SMTP_USER'),
        pass: configService.get<string>('SMTP_PASS'),
      },
    });
  }

  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options);
  }
}

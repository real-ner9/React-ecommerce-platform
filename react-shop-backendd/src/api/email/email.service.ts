import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { SmtpSettingsService } from '../smtp-settings/smtp-settings.service';

@Injectable()
export class EmailService {
  private nodemailerTransport: Mail | null = null;
  private readonly logger = new Logger(EmailService.name);
  private cachedKey: string | null = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly smtpSettingsService: SmtpSettingsService,
  ) {
    this.initFromEnv();
  }

  private initFromEnv() {
    const smtpHost = this.configService.get<string>('SMTP_HOST');

    if (smtpHost) {
      const smtpPort = this.configService.get<number>('SMTP_PORT') ?? 587;
      this.nodemailerTransport = createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: this.configService.get<string>('SMTP_USER'),
          pass: this.configService.get<string>('SMTP_PASS'),
        },
      });
      this.cachedKey = `env:${smtpHost}:${smtpPort}`;
      this.logger.log(`SMTP configured from env: ${smtpHost}:${smtpPort}`);
    } else {
      this.logger.warn('SMTP not configured in env — will check DB settings');
    }
  }

  private async getTransport(): Promise<Mail | null> {
    const dbSettings = await this.smtpSettingsService.getRawSettings();

    if (dbSettings) {
      const dbKey = `db:${dbSettings.host}:${dbSettings.port}:${dbSettings.user}`;

      if (this.cachedKey !== dbKey) {
        this.nodemailerTransport = createTransport({
          host: dbSettings.host,
          port: dbSettings.port,
          secure: dbSettings.secure,
          auth: {
            user: dbSettings.user,
            pass: dbSettings.pass,
          },
        });
        this.cachedKey = dbKey;
        this.logger.log(`SMTP transport updated from DB: ${dbSettings.host}:${dbSettings.port}`);
      }

      return this.nodemailerTransport;
    }

    return this.nodemailerTransport;
  }

  async sendMail(options: Mail.Options) {
    const transport = await this.getTransport();

    if (!transport) {
      this.logger.warn(`Email to ${options.to} skipped — SMTP not configured`);
      return;
    }

    return transport.sendMail(options);
  }
}

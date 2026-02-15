import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createTransport } from 'nodemailer';
import { SmtpSettings } from './entities/smtp-settings.entity';
import { UpdateSmtpSettingsDto } from './dto/smtp-settings.dto';

@Injectable()
export class SmtpSettingsService {
  private readonly logger = new Logger(SmtpSettingsService.name);

  constructor(
    @InjectRepository(SmtpSettings)
    private readonly repo: Repository<SmtpSettings>,
  ) {}

  async getSettings(): Promise<Partial<SmtpSettings> | null> {
    const settings = await this.repo.findOne({ where: { id: 1 } });
    if (!settings) return null;

    return {
      ...settings,
      pass: settings.pass ? '••••••••' : '',
    };
  }

  async getRawSettings(): Promise<SmtpSettings | null> {
    return this.repo.findOne({ where: { id: 1 } });
  }

  async updateSettings(dto: UpdateSmtpSettingsDto): Promise<SmtpSettings> {
    let settings = await this.repo.findOne({ where: { id: 1 } });

    if (settings) {
      Object.assign(settings, dto);
    } else {
      settings = this.repo.create({ ...dto, id: 1 });
    }

    const saved = await this.repo.save(settings);
    this.logger.log(`SMTP settings updated: ${saved.host}:${saved.port}`);
    return saved;
  }

  async testConnection(dto: UpdateSmtpSettingsDto): Promise<{ success: boolean; message: string }> {
    try {
      const transporter = createTransport({
        host: dto.host,
        port: dto.port,
        secure: dto.secure,
        auth: {
          user: dto.user,
          pass: dto.pass,
        },
      });

      await transporter.verify();
      return { success: true, message: 'SMTP connection successful' };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.warn(`SMTP test failed: ${message}`);
      return { success: false, message };
    }
  }
}

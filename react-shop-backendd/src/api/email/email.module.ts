import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule } from "@nestjs/config";
import { SmtpSettingsModule } from '../smtp-settings/smtp-settings.module';

@Module({
  imports: [ConfigModule, SmtpSettingsModule],
  controllers: [],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}

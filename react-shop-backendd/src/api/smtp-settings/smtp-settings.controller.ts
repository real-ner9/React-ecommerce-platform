import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { SmtpSettingsService } from './smtp-settings.service';
import { UpdateSmtpSettingsDto } from './dto/smtp-settings.dto';
import RoleGuard from '../user/role.guard';
import Role from '../user/role.enum';

@Controller('smtp-settings')
export class SmtpSettingsController {
  constructor(private readonly smtpSettingsService: SmtpSettingsService) {}

  @Get()
  @UseGuards(RoleGuard(Role.Admin))
  getSettings() {
    return this.smtpSettingsService.getSettings();
  }

  @Put()
  @UseGuards(RoleGuard(Role.Admin))
  updateSettings(@Body() dto: UpdateSmtpSettingsDto) {
    return this.smtpSettingsService.updateSettings(dto);
  }

  @Post('test')
  @UseGuards(RoleGuard(Role.Admin))
  testConnection(@Body() dto: UpdateSmtpSettingsDto) {
    return this.smtpSettingsService.testConnection(dto);
  }
}

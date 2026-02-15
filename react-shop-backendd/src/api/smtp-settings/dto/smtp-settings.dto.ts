import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSmtpSettingsDto {
  @IsString()
  host: string;

  @IsNumber()
  port: number;

  @IsBoolean()
  secure: boolean;

  @IsString()
  user: string;

  @IsString()
  pass: string;

  @IsOptional()
  @IsString()
  fromName?: string;

  @IsOptional()
  @IsString()
  fromEmail?: string;
}

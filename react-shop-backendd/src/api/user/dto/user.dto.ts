import { IsEnum, IsOptional, IsString } from 'class-validator';
import Role from '../role.enum';

export class UpdateNameDto {
  @IsString()
  @IsOptional()
  public readonly name?: string;
}

export class GetUserByJwtDto {
  @IsString()
  public readonly token: string
}

export class UpdateRoleDto {
  @IsEnum(Role)
  public readonly role: Role;
}

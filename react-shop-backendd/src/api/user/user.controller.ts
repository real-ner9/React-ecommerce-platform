import { Request } from 'express';

import {
  ClassSerializerInterceptor,
  Controller,
  Req,
  UseGuards,
  UseInterceptors,
  Put,
  Body,
  Inject,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from "@nestjs/common";
import { JwtAuthGuard } from '../auth/auth.guard';
import RoleGuard from './role.guard';
import Role from './role.enum';

import { UpdateNameDto, UpdateRoleDto } from "./dto/user.dto";
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService) private readonly service: UserService,
  ) {}

  @Put('name')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private updateName(@Body() body: UpdateNameDto, @Req() req: Request): Promise<User> {
    return this.service.updateName(body, req);
  }

  @Get('all')
  @UseGuards(RoleGuard(Role.Admin))
  @UseInterceptors(ClassSerializerInterceptor)
  private findAll() {
    return this.service.findAll()
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  private findUser(@Param('id', ParseIntPipe) id: number) {
    return this.service.findUser(id)
  }

  @Patch(':id/role')
  @UseGuards(RoleGuard(Role.Admin))
  @UseInterceptors(ClassSerializerInterceptor)
  private updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateRoleDto,
  ) {
    return this.service.updateRole(id, body.role);
  }
}

import {
  Controller,
  Get,
  Param,
  Res,
  ParseIntPipe,
  StreamableFile,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { Response } from 'express';
import RoleGuard from '../user/role.guard';
import Role from '../user/role.enum';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { stream, file } = await this.filesService.getFileStream(id);

    response.set({
      'Content-Disposition': `inline; filename="${file.filename}"`,
      'Content-Type': file.mimetype,
    });

    return new StreamableFile(stream);
  }

  @Delete(':id')
  @UseGuards(RoleGuard(Role.Admin))
  private removeSlideImg(@Param('id', ParseIntPipe) id: number) {
    return this.filesService.remove(id);
  }
}

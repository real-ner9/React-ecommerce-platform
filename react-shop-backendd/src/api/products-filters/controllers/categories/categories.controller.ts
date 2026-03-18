import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import RoleGuard from '../../../user/role.guard';
import Role from '../../../user/role.enum';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../../dto/category.dto';
import { Category } from '../../entities/category.entity';
import { DeleteResult } from 'typeorm/browser';
import LocalFileInterceptor from '../../../files/interceptors/local-file.interceptor';
import type { ExpressMulterFile } from '../../../types/file';
import LocalFile from '../../../files/entities/local-file.entity';
import { FilesService } from '../../../files/files.service';
import { CategoriesService } from '../../services/categories/categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly filesService: FilesService,
  ) {}

  @Get()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Post()
  @UseGuards(RoleGuard(Role.Admin))
  create(@Body() body: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(body);
  }

  @Post('upload-img')
  @UseGuards(RoleGuard(Role.Admin))
  @UseInterceptors(
    LocalFileInterceptor({
      fieldName: 'img',
      path: '/categories-images',
    }),
  )
  private createImg(
    @UploadedFile() img: ExpressMulterFile,
  ): Promise<LocalFile> {
    return this.filesService.create(img, 'categories-images');
  }

  @Patch(':id')
  @UseGuards(RoleGuard(Role.Admin))
  private update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(RoleGuard(Role.Admin))
  private remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.categoriesService.remove(id);
  }
}

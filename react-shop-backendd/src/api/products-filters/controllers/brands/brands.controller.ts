import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import RoleGuard from '../../../user/role.guard';
import Role from '../../../user/role.enum';
import { DeleteResult, UpdateResult } from 'typeorm';
import { BrandsService } from '../../services/brands/brands.service';
import {
  BrandFiltersDto,
  CreateBrandDto,
  UpdateBrandDto,
} from '../../dto/brand.dto';
import { Brand } from '../../entities/brand.entity';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get()
  findAll(@Query() query: BrandFiltersDto): Promise<Brand[]> {
    const categoryId = Number(query.category_id);
    if (categoryId && !Number.isNaN(categoryId)) {
      return this.brandsService.findAllWithFilters(categoryId);
    }
    return this.brandsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Brand> {
    return this.brandsService.findOne(id);
  }

  @Post()
  @UseGuards(RoleGuard(Role.Admin))
  create(@Body() body: CreateBrandDto): Promise<Brand> {
    return this.brandsService.create(body);
  }

  @Patch(':id')
  @UseGuards(RoleGuard(Role.Admin))
  private update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateBrandDto,
  ): Promise<UpdateResult> {
    return this.brandsService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(RoleGuard(Role.Admin))
  private remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.brandsService.remove(id);
  }
}

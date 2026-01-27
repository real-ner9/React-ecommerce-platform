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
import { ColorsService } from '../../services/colors/colors.service';
import {
  ColorFiltersDto,
  CreateColorDto,
  UpdateColorDto,
} from '../../dto/color.dto';
import { Color } from '../../entities/color.entity';

@Controller('colors')
export class ColorsController {
  constructor(private readonly colorsService: ColorsService) {}

  @Get()
  findAll(@Query() query: ColorFiltersDto): Promise<Color[]> {
    const categoryId = Number(query.category_id);
    if (categoryId && !Number.isNaN(categoryId)) {
      return this.colorsService.findAllWithFilters(categoryId);
    }
    return this.colorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Color> {
    return this.colorsService.findOne(id);
  }

  @Post()
  @UseGuards(RoleGuard(Role.Admin))
  create(@Body() body: CreateColorDto): Promise<Color> {
    return this.colorsService.create(body);
  }

  @Patch(':id')
  @UseGuards(RoleGuard(Role.Admin))
  private update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateColorDto,
  ): Promise<UpdateResult> {
    return this.colorsService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(RoleGuard(Role.Admin))
  private remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.colorsService.remove(id);
  }
}

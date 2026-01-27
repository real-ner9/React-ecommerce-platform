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
import { AmountService } from '../../services/amount/amount.service';
import {
  AmountFiltersDto,
  CreateAmountDto,
  UpdateAmountDto,
} from '../../dto/amount.dto';
import { Amount } from '../../entities/amount.entity';

@Controller('amount')
export class AmountController {
  constructor(private readonly amountService: AmountService) {}

  @Get()
  findAll(@Query() query: AmountFiltersDto): Promise<Amount[]> {
    const categoryId = Number(query.category_id);
    if (categoryId && !Number.isNaN(categoryId)) {
      return this.amountService.findAllWithFilters(categoryId);
    }
    return this.amountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Amount> {
    return this.amountService.findOne(id);
  }

  @Post()
  @UseGuards(RoleGuard(Role.Admin))
  create(@Body() body: CreateAmountDto): Promise<Amount> {
    return this.amountService.create(body);
  }

  @Patch(':id')
  @UseGuards(RoleGuard(Role.Admin))
  private update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateAmountDto,
  ): Promise<UpdateResult> {
    return this.amountService.update(id, body);
  }

  @Delete(':id')
  @UseGuards(RoleGuard(Role.Admin))
  private remove(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.amountService.remove(id);
  }
}

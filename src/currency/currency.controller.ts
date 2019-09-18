import {Get, Param, Controller} from '@nestjs/common';
import { CurrencyService } from './currency.service';

import {
  ApiUseTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CurrencyEntity } from "../entities/currency.entity";

@ApiBearerAuth()
@ApiUseTags('currencies')
@Controller('currencies')
export class CurrencyController {

  constructor(private readonly currencyService: CurrencyService) {}

  @ApiOperation({ title: 'Get all currencies' })
  @ApiResponse({ status: 200, description: 'Return all currencies.'})
  @Get()
  async findAll(): Promise<CurrencyEntity[]> {
    return await this.currencyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CurrencyEntity> {
    return await this.currencyService.findById(id);
  }
}

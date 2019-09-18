import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CurrencyEntity } from '../entities/currency.entity';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(CurrencyEntity)
    private readonly currencyRepository: Repository<CurrencyEntity>,
  ) {}

  async findById(id: number): Promise<CurrencyEntity> {
    return await this.currencyRepository.findOne(id);
  }

  async findAll(): Promise<CurrencyEntity[]> {
    return await this.currencyRepository.find();
  }
}

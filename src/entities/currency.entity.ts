import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CurrencyInterface } from "../currency/currency.interface";

@Entity('currency')
export class CurrencyEntity implements CurrencyInterface{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  rate: number;
}

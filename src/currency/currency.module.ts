import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CurrencyController } from './currency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyEntity } from '../entities/currency.entity';
import { CurrencyService } from './currency.service';
import { AuthMiddleware } from '../user/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([CurrencyEntity])],
  providers: [CurrencyService],
  controllers: [
    CurrencyController
  ]
})
export class CurrencyModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({path: 'currencies', method: RequestMethod.GET},
        {path: 'currencies/:id', method: RequestMethod.GET})
  }
}

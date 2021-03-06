import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthMiddleware } from './auth.middleware';

@Module({
  providers: [UserService],
  controllers: [
    UserController
  ],
  exports: [UserService]
})

export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({path: 'users', method: RequestMethod.GET});
  }
}

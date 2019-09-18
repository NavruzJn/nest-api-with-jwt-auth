import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import {port} from './config.ts.example';

async function bootstrap() {
  const appOptions = {cors: true};
  const app = await NestFactory.create(ApplicationModule, appOptions);
  app.setGlobalPrefix('api');

  // const options = new DocumentBuilder()
  //   .setTitle('Nest js with JWT authorization')
  //   .setDescription('')
  //   .setVersion('1.0')
  //   .setBasePath('api')
  //   .addBearerAuth()
  //   .build();
  // const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('/docs', app, document);

  await app.listen(port);
}
bootstrap();

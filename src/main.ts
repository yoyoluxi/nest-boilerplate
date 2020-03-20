import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as art from 'express-art-template'

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { ApiParamsValidationPipe } from './common/pipes/api-params-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  
  // 处理静态文件
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // 设置视图目录
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  // 指定模板引擎
  app.engine('art', art);


  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ApiParamsValidationPipe());
  await app.listen(3000);
}
bootstrap();

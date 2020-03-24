import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

// mvc 
import { join } from 'path';
import * as art from 'express-art-template'

// 守卫 
import * as Authing from 'express-authing';
import { RolesGuard } from './users/guards/roles.guard';

import { AppModule } from './app.module';

// 过滤器
import { HttpExceptionFilter } from './common/filters/http-exception.filter'

// 管道
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
  app.useGlobalGuards(new RolesGuard(new Reflector()));

  app.use(Authing({
    clientId: '5e7456d646123b3e5d490efe',
    secret: '4a167033a3d341fc397b73d82ae2ca85'
  }))

  await app.listen(3000);
}
bootstrap();

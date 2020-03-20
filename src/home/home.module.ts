import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core'
import { HomeController } from './home.controller';
import { ViewInterceptor } from '../common/interceptors/view.interceptor';

@Module({
  controllers: [HomeController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ViewInterceptor
    }
  ]
})
export class HomeModule {}

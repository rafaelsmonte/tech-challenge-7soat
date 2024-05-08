import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { CostumerModule } from './costumer/costumer.module';
import appConfig from './app.config';
import logger from './app.logger';
import { AppLoggerMiddleware } from './app.logger.middleware';

@Module({
  imports: [OrderModule, logger, appConfig, CostumerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}

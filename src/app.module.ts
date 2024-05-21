import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { CustomerModule } from './customer/customer.module';
import appConfig from './app.config';
import logger from './app.logger';
import { AppLoggerMiddleware } from './app.logger.middleware';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './infra/prisma/prisma.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    logger,
    appConfig,
    PrismaModule,
    CustomerModule,
    ProductModule,
    OrderModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}

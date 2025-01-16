import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { PlaceModule } from './modules/place/place.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from '../config/index';
import { APP_FILTER } from '@nestjs/core';
import { CatchEverythingFilter } from 'lib/exceptionFilter';

@Module({
  imports: [
    MongooseModule.forRoot(config.DB_URL),
    ProductModule,
    CategoryModule,
    PlaceModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { PlaceModule } from './modules/place/place.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from '../config/index';
import { APP_FILTER } from '@nestjs/core';
import { CatchEverythingFilter } from 'lib/exceptionFilter';
import { UserModule } from './modules/user/user.module';
import { CartModule } from './modules/cart/cart.module';
import { TgBotModule } from './modules/tg_bot/tg_bot.module';
import { UserCModule } from './modules/user-c/user-c.module';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from 'shared/shared.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.DB_URL),
    ProductModule,
    CategoryModule,
    PlaceModule,
    UserModule,
    CartModule,
    TgBotModule,
    UserCModule,
    AuthModule,
    SharedModule,
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

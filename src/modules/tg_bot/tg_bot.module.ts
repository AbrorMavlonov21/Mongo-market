import { Module } from '@nestjs/common';
import { TgBotService } from './tg_bot.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity } from '../user/entities/user.entity';
import {
  ProductEntity,
  ProductSchema,
} from '../product/entities/product.entity';
import { CartEntity, CartSchema } from '../cart/entities/cart.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserEntity.name, schema: ProductSchema },
      { name: ProductEntity.name, schema: ProductSchema },
      { name: CartEntity.name, schema: CartSchema },
    ]),
  ],
  providers: [TgBotService],
})
export class TgBotModule {}

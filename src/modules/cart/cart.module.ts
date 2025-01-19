import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CartEntity, CartSchema } from './entities/cart.entity';
import { CartRepository } from './cart.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CartEntity.name, schema: CartSchema }]),
  ],
  controllers: [CartController],
  providers: [
    { provide: 'ICartService', useClass: CartService },
    { provide: 'ICartRepository', useClass: CartRepository },
  ],
})
export class CartModule {}

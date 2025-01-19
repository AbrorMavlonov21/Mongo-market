import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';

export type CartDocument = HydratedDocument<CartEntity>;
@Schema()
export class CartEntity extends Document {
  @Prop({ required: true })
  userId: number;

  @Prop({
    type: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'ProductEntity',
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    default: [],
  })
  products: { productId: mongoose.Schema.Types.ObjectId; quantity: number }[];

  @Prop({ type: Number, default: 0 })
  total: number;
}

export const CartSchema = SchemaFactory.createForClass(CartEntity);

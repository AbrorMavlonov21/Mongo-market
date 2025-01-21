import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'common/base.entity';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<ProductEntity>;

export interface IProduct extends BaseEntity {
  name: string;
  description: string;
  price: number;
  categoryId: mongoose.Schema.Types.ObjectId;
  // placeId: string;
}

@Schema({ collection: 'Products' })
export class ProductEntity extends BaseEntity implements IProduct {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CategoryEntity' })
  categoryId: mongoose.Schema.Types.ObjectId;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Places' })
  // placeId: string;
}

export const ProductSchema = SchemaFactory.createForClass(ProductEntity);

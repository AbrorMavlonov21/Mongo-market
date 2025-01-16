import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<CategoryEntity>;

export interface ICategory {
  name: string;
}

@Schema({ collection: 'Categories' })
export class CategoryEntity implements ICategory {
  @Prop({ required: true })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryEntity);

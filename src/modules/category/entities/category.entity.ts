import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'common/base.entity';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<CategoryEntity>;

export interface ICategory extends BaseEntity {
  name: string;
}

@Schema({ collection: 'Categories' })
export class CategoryEntity extends BaseEntity implements ICategory {
  @Prop({ required: true })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryEntity);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'common/base.entity';
import { HydratedDocument } from 'mongoose';

export type PlaceDocument = HydratedDocument<PlaceEntity>;

export interface IPlace extends BaseEntity {
  name: string;
}

@Schema({ collection: 'Place' })
export class PlaceEntity extends BaseEntity implements IPlace {
  @Prop({ required: true })
  name: string;
}

export const PlaceSchema = SchemaFactory.createForClass(PlaceEntity);

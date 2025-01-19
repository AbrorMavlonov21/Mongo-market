import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserEntity>;

export interface IUser {
  username: string;
  chatId: string;
  language: string;
}

@Schema({ collection: 'Users' })
export class UserEntity implements IUser {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  chatId: string;

  @Prop({ required: true })
  language: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);

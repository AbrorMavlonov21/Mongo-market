import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'common/base.entity';
import { HydratedDocument } from 'mongoose';
import { Role } from 'role/role.enum';

export type UserCDocument = HydratedDocument<UserCEntity>;

export interface IUserC extends BaseEntity {
  login: string;
  password: string;
  fullname?: string;
  roles?: string[];
}

@Schema({ collection: 'UserCs' })
export class UserCEntity extends BaseEntity implements IUserC {
  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false })
  fullname: string;

  @Prop({ required: false, default: [Role.User] })
  roles: string[];
}

export const UserCSchema = SchemaFactory.createForClass(UserCEntity);

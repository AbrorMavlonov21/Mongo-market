import { Prop } from '@nestjs/mongoose';

export abstract class BaseEntity {
  @Prop({ required: true, type: Date, default: Date.now })
  createdAt: Date;
  @Prop({ required: true, type: Date, default: Date.now })
  lastUpdatedAt: Date;
}

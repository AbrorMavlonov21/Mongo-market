import { Module } from '@nestjs/common';
import { UserCService } from './user-c.service';
import { UserCController } from './user-c.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCEntity, UserCSchema } from './entities/user-c.entity';
import { UserCRepository } from './user-c.repository';
import { SharedModule } from 'shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserCEntity.name, schema: UserCSchema },
    ]),
    SharedModule,
  ],
  controllers: [UserCController],
  providers: [
    { provide: 'IUserCService', useClass: UserCService },
    { provide: 'IUserCRepository', useClass: UserCRepository },
  ],
})
export class UserCModule {}

import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwtStrategy';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserCEntity,
  UserCSchema,
} from 'src/modules/user-c/entities/user-c.entity';
import { UserCService } from 'src/modules/user-c/user-c.service';
import { UserCRepository } from 'src/modules/user-c/user-c.repository';
import { config } from '../config/index';

@Module({
  imports: [
    JwtModule.register({ secret: config.JWT_ACCESS_SECRET, global: true }),
    MongooseModule.forFeature([
      { name: UserCEntity.name, schema: UserCSchema },
    ]),
  ],
  providers: [
    { provide: 'IUserCService', useClass: UserCService },
    { provide: 'IUserCRepository', useClass: UserCRepository },
    JwtStrategy,
  ],
  exports: [
    { provide: 'IUserCService', useClass: UserCService },
    { provide: 'IUserCRepository', useClass: UserCRepository },
    JwtStrategy,
  ],
})
export class SharedModule {}

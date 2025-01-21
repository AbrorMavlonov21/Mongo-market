import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { config } from '../../../config/index';
import { MongooseModule } from '@nestjs/mongoose';
import { UserCEntity, UserCSchema } from '../user-c/entities/user-c.entity';
import { UserCService } from '../user-c/user-c.service';
import { UserCRepository } from '../user-c/user-c.repository';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserCEntity.name, schema: UserCSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: config.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: 'IUserCService', useClass: UserCService },
    { provide: 'IUserCRepository', useClass: UserCRepository },
  ],
})
export class AuthModule {}

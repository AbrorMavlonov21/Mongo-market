import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'common/base.repostory';
import { UserCEntity } from './entities/user-c.entity';
import { UpdateUserCDto } from './dto/update-user-c.dto';
import { CreateUserCDto } from './dto/create-user-c.dto';
import { IUserCRepository } from './interfaces/iuser-c.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserCRepository
  extends BaseRepository<UserCEntity, CreateUserCDto, UpdateUserCDto>
  implements IUserCRepository
{
  constructor(
    @InjectModel(UserCEntity.name)
    private userCModel: Model<UserCEntity>,
  ) {
    super(userCModel);
  }
}

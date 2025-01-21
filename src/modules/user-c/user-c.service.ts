import { Inject, Injectable } from '@nestjs/common';
import { CreateUserCDto } from './dto/create-user-c.dto';
import { UpdateUserCDto } from './dto/update-user-c.dto';
import { BaseService } from 'common/base.service';
import { UserCEntity } from './entities/user-c.entity';
import { IUserCService } from './interfaces/iuser-c.service';
import { IUserCRepository } from './interfaces/iuser-c.repository';

@Injectable()
export class UserCService
  extends BaseService<UserCEntity, CreateUserCDto, UpdateUserCDto>
  implements IUserCService
{
  constructor(
    @Inject('IUserCRepository')
    private readonly UserCRepository: IUserCRepository,
  ) {
    super(UserCRepository, 'User');
  }
}

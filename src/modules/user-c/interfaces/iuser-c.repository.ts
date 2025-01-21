import { UserCEntity } from '../entities/user-c.entity';
import { CreateUserCDto } from '../dto/create-user-c.dto';
import { UpdateUserCDto } from '../dto/update-user-c.dto';
import { BaseRepository } from 'common/base.repostory';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IUserCRepository
  extends BaseRepository<UserCEntity, CreateUserCDto, UpdateUserCDto> {}

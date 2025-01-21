import { BaseService } from 'common/base.service';
import { CreateUserCDto } from '../dto/create-user-c.dto';
import { UpdateUserCDto } from '../dto/update-user-c.dto';
import { UserCEntity } from '../entities/user-c.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IUserCService
  extends BaseService<UserCEntity, CreateUserCDto, UpdateUserCDto> {}

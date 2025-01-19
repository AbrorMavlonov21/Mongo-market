import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserDocument } from '../entities/user.entity';

export interface IUserRepository {
  create(dto: CreateUserDto): Promise<UserDocument>;
  getAll(): Promise<Array<UserDocument>>;
  update(id: string, dto: UpdateUserDto): Promise<UserDocument>;
  delete(id: string): Promise<UserDocument>;
  getById(id: string): Promise<UserDocument>;
}

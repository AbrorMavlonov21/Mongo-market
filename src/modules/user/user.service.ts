import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './entities/user.entity';
import { IUserRepository } from './interfaces/iuser.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}
  async create(dto: CreateUserDto): Promise<UserDocument> {
    return await this.userRepository.create(dto);
  }

  async getAll(): Promise<Array<UserDocument>> {
    return await this.userRepository.getAll();
  }

  async getById(id: string): Promise<UserDocument> {
    return await this.userRepository.getById(id);
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserDocument> {
    return await this.userRepository.update(id, dto);
  }

  async remove(id: string): Promise<UserDocument> {
    return await this.userRepository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from './interfaces/iuser.repository';
import { UserDocument, UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(UserEntity.name)
    private userModel: Model<UserDocument>,
  ) {}
  async create(dto: CreateUserDto): Promise<UserDocument> {
    return await this.userModel.create(dto);
  }
  async getAll(): Promise<Array<UserDocument>> {
    return await this.userModel.find();
  }
  async update(id: string, dto: UpdateUserDto): Promise<UserDocument> {
    return await this.userModel.findByIdAndUpdate(id, dto);
  }
  async delete(id: string): Promise<UserDocument> {
    return await this.userModel.findByIdAndDelete(id);
  }
  async getById(id: string): Promise<UserDocument | undefined> {
    return await this.userModel.findById(id);
  }
}

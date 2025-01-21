import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CreateUserCDto } from './dto/create-user-c.dto';
import { UpdateUserCDto } from './dto/update-user-c.dto';
import { IUserCService } from './interfaces/iuser-c.service';
import { Bcrypt } from 'lib/bcrypt';
import mongoose from 'mongoose';
import { Roles } from 'role/roles.decorator';
import { Role } from 'role/role.enum';
import { JwtAuthGuard } from 'shared/jwt.guard';
import { RolesGuard } from 'role/roles.guard';

@Controller('user-c')
export class UserCController {
  constructor(
    @Inject('IUserCService')
    private readonly userCService: IUserCService,
  ) {}

  @Post('create-mongo')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() createUserCDto: CreateUserCDto) {
    try {
      const { meta } = await this.userCService.getByLogin(createUserCDto.login);
      if (meta.statusCode === 200) {
        throw new HttpException(
          'User with this Login name already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashedPassword = await Bcrypt.hash(createUserCDto.password);
      const dto = { ...createUserCDto, password: hashedPassword };
      const resData = await this.userCService.create(dto);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to create User',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get-all-mongo')
  async findAll() {
    try {
      const resData = await this.userCService.findAll();
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find Users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get-mongo/:id')
  async findOne(@Param('id') id: string) {
    try {
      const isValidId = mongoose.Types.ObjectId.isValid(id);
      if (!isValidId) {
        throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
      }
      const resData = await this.userCService.findOne(id);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find Users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('update-mongo/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUserCDto: UpdateUserCDto,
  ) {
    try {
      const isValidId = mongoose.Types.ObjectId.isValid(id);
      if (!isValidId) {
        throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
      }
      await this.userCService.findOne(id);
      const { meta } = await this.userCService.getByLogin(updateUserCDto.login);
      if (meta.statusCode === 200) {
        throw new HttpException(
          'User with this Login name already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      const hashedPassword = await Bcrypt.hash(updateUserCDto.password);
      const dto = { ...updateUserCDto, password: hashedPassword };
      const resData = await this.userCService.update(id, dto);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find Users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('delete-mongo/:id')
  async remove(@Param('id') id: string) {
    try {
      const isValidId = mongoose.Types.ObjectId.isValid(id);
      if (!isValidId) {
        throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
      }
      await this.userCService.findOne(id);
      const resData = await this.userCService.remove(id);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find Users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

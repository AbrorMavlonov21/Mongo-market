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
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import mongoose from 'mongoose';
import { ICategoryService } from './interfaces/icategory.service';

@Controller('category')
export class CategoryController {
  constructor(
    @Inject('ICategoryService')
    private readonly categoryService: ICategoryService,
  ) {}
  @Post('create')
  async create(@Body() dto: CreateCategoryDto) {
    try {
      const resData = await this.categoryService.create(dto);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to create category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get-all')
  async findAll() {
    try {
      const resData = await this.categoryService.findAll();
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find categories',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get/:id')
  async findOne(@Param('id') id: string) {
    try {
      const isValidId = mongoose.Types.ObjectId.isValid(id);
      if (!isValidId) {
        throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
      }
      const resData = await this.categoryService.findOne(id);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    try {
      const isValidId = mongoose.Types.ObjectId.isValid(id);
      if (!isValidId) {
        throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
      }
      const resData = await this.categoryService.update(id, dto);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find categories',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    try {
      const isValidId = mongoose.Types.ObjectId.isValid(id);
      if (!isValidId) {
        throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
      }
      const resData = await this.categoryService.remove(id);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find categories',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

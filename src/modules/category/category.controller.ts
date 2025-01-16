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
import { ResData } from 'lib/resData';
import { CategoryDocument } from './entities/category.entity';
import mongoose from 'mongoose';
import { ICategoryService } from './interfaces/icategory.service';

@Controller('category')
export class CategoryController {
  constructor(
    @Inject('ICategoryService')
    private readonly categoryService: ICategoryService,
  ) {}
  @Post('create')
  async create(
    @Body() dto: CreateCategoryDto,
  ): Promise<ResData<CategoryDocument>> {
    try {
      const resData = await this.categoryService.create(dto);
      return new ResData<CategoryDocument>(
        HttpStatus.CREATED,
        'Created Successfully',
        resData,
      );
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
      const resData = await this.categoryService.getAll();
      return new ResData<Array<CategoryDocument>>(
        HttpStatus.OK,
        'Success',
        resData,
      );
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
      const resData = await this.categoryService.getById(id);
      return new ResData<CategoryDocument>(HttpStatus.OK, 'Success', resData);
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
      return new ResData<CategoryDocument>(
        HttpStatus.OK,
        'Updated Successfully',
        resData,
      );
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
      const resData = await this.categoryService.delete(id);
      return new ResData<CategoryDocument>(
        HttpStatus.OK,
        'deleted Successfully',
        resData,
      );
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

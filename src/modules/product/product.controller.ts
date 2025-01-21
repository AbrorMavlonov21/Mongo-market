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
import mongoose from 'mongoose';
import { IProductService } from './interfaces/iproduct.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ICategoryService } from '../category/interfaces/icategory.service';

@Controller('product')
export class ProductController {
  constructor(
    @Inject('IProductService')
    private readonly productService: IProductService,
    @Inject('ICategoryService')
    private readonly categoryService: ICategoryService,
  ) {}
  @Post('create')
  async create(@Body() dto: CreateProductDto) {
    try {
      await this.categoryService.findOne(dto.categoryId);
      const resData = await this.productService.create(dto);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to create Product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get-all')
  async findAll() {
    try {
      const resData = await this.productService.findAll();
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
      const resData = await this.productService.findOne(id);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find Product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    try {
      const isValidId = mongoose.Types.ObjectId.isValid(id);
      if (!isValidId) {
        throw new HttpException('Invalid Id', HttpStatus.BAD_REQUEST);
      }
      await this.categoryService.findOne(dto.categoryId);
      const resData = await this.productService.update(id, dto);
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
      const resData = await this.productService.remove(id);
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

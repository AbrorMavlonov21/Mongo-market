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
import { ResData } from 'lib/resData';
import mongoose from 'mongoose';
import { IProductService } from './interfaces/iproduct.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDocument } from './entities/product.entity';
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
  async create(
    @Body() dto: CreateProductDto,
  ): Promise<ResData<ProductDocument>> {
    try {
      const data = await this.categoryService.getById(dto.categoryId);
      if (!data) {
        throw new HttpException('Category Not Found', HttpStatus.NOT_FOUND);
      }
      const resData = await this.productService.create(dto);
      return new ResData<ProductDocument>(
        HttpStatus.CREATED,
        'Created Successfully',
        resData,
      );
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
      const resData = await this.productService.getAll();
      return new ResData<Array<ProductDocument>>(
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
      const resData = await this.productService.getById(id);
      return new ResData<ProductDocument>(HttpStatus.OK, 'Success', resData);
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
      const resData = await this.productService.update(id, dto);
      return new ResData<ProductDocument>(
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
      const resData = await this.productService.delete(id);
      return new ResData<ProductDocument>(
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

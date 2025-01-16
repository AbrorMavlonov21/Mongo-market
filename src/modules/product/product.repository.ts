import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { IProductRepository } from './interfaces/iproduct.repository';
import { ProductDocument, ProductEntity } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectModel(ProductEntity.name)
    private productModel: Model<ProductDocument>,
  ) {}
  async create(dto: CreateProductDto): Promise<ProductDocument> {
    return await this.productModel.create(dto);
  }
  async getAll(): Promise<Array<ProductDocument>> {
    return await this.productModel.find().populate('categoryId');
  }
  async update(id: string, dto: UpdateProductDto): Promise<ProductDocument> {
    return await this.productModel.findByIdAndUpdate(id, dto);
  }
  async delete(id: string): Promise<ProductDocument> {
    return await this.productModel.findByIdAndDelete(id);
  }
  async getById(
    id: string,
  ): Promise<HydratedDocument<ProductEntity | undefined>> {
    return await this.productModel.findById(id);
  }
}

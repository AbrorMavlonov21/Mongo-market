import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IProductService } from './interfaces/iproduct.service';
import { IProductRepository } from './interfaces/iproduct.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductDocument } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}
  async create(dto: CreateProductDto): Promise<ProductDocument> {
    const data = await this.productRepository.create(dto);
    return data;
  }
  async getAll(): Promise<Array<ProductDocument>> {
    return await this.productRepository.getAll();
  }
  async update(id: string, dto: UpdateProductDto): Promise<ProductDocument> {
    return await this.productRepository.update(id, dto);
  }
  async delete(id: string): Promise<ProductDocument> {
    return await this.productRepository.delete(id);
  }
  async getById(id: string): Promise<ProductDocument | undefined> {
    const data = await this.productRepository.getById(id);
    if (!data) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return data;
  }
}

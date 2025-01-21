import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProductRepository } from './interfaces/iproduct.repository';
import { ProductEntity } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { BaseRepository } from 'common/base.repostory';

@Injectable()
export class ProductRepository
  extends BaseRepository<ProductEntity, CreateProductDto, UpdateProductDto>
  implements IProductRepository
{
  constructor(
    @InjectModel(ProductEntity.name)
    private productModel: Model<ProductEntity>,
  ) {
    super(productModel);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { IProductService } from './interfaces/iproduct.service';
import { IProductRepository } from './interfaces/iproduct.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { BaseService } from 'common/base.service';

@Injectable()
export class ProductService
  extends BaseService<ProductEntity, CreateProductDto, UpdateProductDto>
  implements IProductService
{
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {
    super(productRepository, 'Product');
  }
}

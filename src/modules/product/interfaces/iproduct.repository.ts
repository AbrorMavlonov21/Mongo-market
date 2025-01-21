import { BaseRepository } from 'common/base.repostory';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductEntity } from '../entities/product.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IProductRepository
  extends BaseRepository<ProductEntity, CreateProductDto, UpdateProductDto> {}

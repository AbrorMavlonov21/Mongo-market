import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductDocument } from '../entities/product.entity';

export interface IProductRepository {
  create(dto: CreateProductDto): Promise<ProductDocument>;
  getAll(): Promise<Array<ProductDocument>>;
  update(id: string, dto: UpdateProductDto): Promise<ProductDocument>;
  delete(id: string): Promise<ProductDocument>;
  getById(id: string): Promise<ProductDocument>;
}

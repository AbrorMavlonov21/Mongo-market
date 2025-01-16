import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductEntity, ProductSchema } from './entities/product.entity';
import { ProductRepository } from './product.repository';
import {
  CategoryEntity,
  CategorySchema,
} from '../category/entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductEntity.name, schema: ProductSchema },
      { name: CategoryEntity.name, schema: CategorySchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [
    { provide: 'IProductService', useClass: ProductService },
    { provide: 'IProductRepository', useClass: ProductRepository },
  ],
})
export class ProductModule {}

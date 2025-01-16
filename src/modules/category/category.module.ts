import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryEntity, CategorySchema } from './entities/category.entity';
import { CategoryRepository } from './category.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategoryEntity.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [
    { provide: 'ICategoryService', useClass: CategoryService },
    { provide: 'ICategoryRepository', useClass: CategoryRepository },
  ],
})
export class CategoryModule {}

import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDocument, CategoryEntity } from './entities/category.entity';
import { ICategoryRepository } from './interfaces/icategory.repository';
import { BaseRepository } from 'common/base.repostory';

@Injectable()
export class CategoryRepository
  extends BaseRepository<CategoryEntity, CreateCategoryDto, UpdateCategoryDto>
  implements ICategoryRepository
{
  constructor(
    @InjectModel(CategoryEntity.name)
    private categoryModel: Model<CategoryDocument>,
  ) {
    super(categoryModel);
  }
}

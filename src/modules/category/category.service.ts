import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { ICategoryService } from './interfaces/icategory.service';
import { ICategoryRepository } from './interfaces/icategory.repository';
import { BaseService } from 'common/base.service';

@Injectable()
export class CategoryService
  extends BaseService<CategoryEntity, CreateCategoryDto, UpdateCategoryDto>
  implements ICategoryService
{
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {
    super(categoryRepository, 'Category');
  }
}

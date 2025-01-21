import { BaseRepository } from 'common/base.repostory';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryEntity } from '../entities/category.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICategoryRepository
  extends BaseRepository<
    CategoryEntity,
    CreateCategoryDto,
    UpdateCategoryDto
  > {}

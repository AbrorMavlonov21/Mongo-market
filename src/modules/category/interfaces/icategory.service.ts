import { BaseService } from 'common/base.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryEntity } from '../entities/category.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICategoryService
  extends BaseService<CategoryEntity, CreateCategoryDto, UpdateCategoryDto> {}

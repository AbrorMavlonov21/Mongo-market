import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryDocument } from '../entities/category.entity';

export interface ICategoryRepository {
  create(dto: CreateCategoryDto): Promise<CategoryDocument>;
  getAll(): Promise<Array<CategoryDocument>>;
  update(id: string, dto: UpdateCategoryDto): Promise<CategoryDocument>;
  delete(id: string): Promise<CategoryDocument>;
  getById(id: string): Promise<CategoryDocument>;
}

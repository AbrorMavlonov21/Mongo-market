import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryDocument } from './entities/category.entity';
import { ICategoryService } from './interfaces/icategory.service';
import { ICategoryRepository } from './interfaces/icategory.repository';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @Inject('ICategoryRepository')
    private readonly categoryRepository: ICategoryRepository,
  ) {}
  async create(dto: CreateCategoryDto): Promise<CategoryDocument> {
    const data = await this.categoryRepository.create(dto);
    return data;
  }
  async getAll(): Promise<Array<CategoryDocument>> {
    return await this.categoryRepository.getAll();
  }
  async update(id: string, dto: UpdateCategoryDto): Promise<CategoryDocument> {
    return await this.categoryRepository.update(id, dto);
  }
  async delete(id: string): Promise<CategoryDocument> {
    return await this.categoryRepository.delete(id);
  }
  async getById(id: string): Promise<CategoryDocument | undefined> {
    const data = await this.categoryRepository.getById(id);
    if (!data) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return data;
  }
}

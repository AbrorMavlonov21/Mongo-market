import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { CategoryDocument, CategoryEntity } from './entities/category.entity';
import { ICategoryRepository } from './interfaces/icategory.repository';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectModel(CategoryEntity.name)
    private categoryModel: Model<CategoryDocument>,
  ) {}
  async create(dto: CreateCategoryDto): Promise<CategoryDocument> {
    return await this.categoryModel.create(dto);
  }
  async getAll(): Promise<Array<CategoryDocument>> {
    return await this.categoryModel.find();
  }
  async update(id: string, dto: UpdateCategoryDto): Promise<CategoryDocument> {
    return await this.categoryModel.findByIdAndUpdate(id, dto);
  }
  async delete(id: string): Promise<CategoryDocument> {
    return await this.categoryModel.findByIdAndDelete(id);
  }
  async getById(
    id: string,
  ): Promise<HydratedDocument<CategoryEntity | undefined>> {
    return await this.categoryModel.findById(id);
  }
}

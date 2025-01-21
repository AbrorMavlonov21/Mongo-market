import { HydratedDocument, Model } from 'mongoose';

export abstract class BaseRepository<Entity, CreateDto, UpdateDto> {
  constructor(private readonly repository: Model<Entity>) {}
  async create(dto: CreateDto): Promise<HydratedDocument<Entity>> {
    return await this.repository.create(dto);
  }
  async getAll(): Promise<Array<HydratedDocument<Entity>>> {
    return await this.repository.find();
  }
  async getById(id: string): Promise<HydratedDocument<Entity>> {
    return await this.repository.findById(id);
  }
  async update(id: string, dto: UpdateDto): Promise<HydratedDocument<Entity>> {
    return await this.repository.findByIdAndUpdate(id, dto);
  }
  async delete(id: string): Promise<HydratedDocument<Entity>> {
    return await this.repository.findByIdAndDelete(id);
  }
  async getByLogin(login: string): Promise<HydratedDocument<Entity>> {
    return await this.repository.findOne({ login });
  }
}

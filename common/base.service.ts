import { HydratedDocument } from 'mongoose';
import { BaseRepository } from './base.repostory';
import { ResData } from 'lib/resData';
import { BaseNotFoundException } from './base.exception';

export abstract class BaseService<Entity, CreateDto, UpdateDto> {
  constructor(
    private readonly repository: BaseRepository<Entity, CreateDto, UpdateDto>,
    private readonly entityName: string,
  ) {}
  async create(dto: CreateDto): Promise<ResData<HydratedDocument<Entity>>> {
    const data = await this.repository.create(dto);
    return new ResData(201, `${this.entityName} created sucessfully`, data);
  }
  async findAll(): Promise<ResData<HydratedDocument<Entity>[]>> {
    const data = await this.repository.getAll();
    return new ResData(200, `${this.entityName} found sucessfully`, data);
  }
  async findOne(id: string): Promise<ResData<HydratedDocument<Entity>>> {
    const data = await this.repository.getById(id);
    if (!data) throw new BaseNotFoundException(this.entityName);
    return new ResData(200, `${this.entityName} found sucessfully`, data);
  }
  async update(
    id: string,
    dto: UpdateDto,
  ): Promise<ResData<HydratedDocument<Entity>>> {
    dto['lastUpdatedAt'] = new Date();
    const data = await this.repository.update(id, dto);
    return new ResData(200, `${this.entityName} updated sucessfully`, data);
  }
  async remove(id: string): Promise<ResData<HydratedDocument<Entity>>> {
    const data = await this.repository.delete(id);
    return new ResData(200, `${this.entityName} removed sucessfully`, data);
  }
  async getByLogin(login: string): Promise<ResData<HydratedDocument<Entity>>> {
    const data = await this.repository.getByLogin(login);
    const resData = new ResData(
      200,
      `${this.entityName} found successfully`,
      data,
    );
    if (!data) {
      resData.meta.statusCode = 404;
      resData.meta.message = 'User not found by Login';
    }
    return resData;
  }
}

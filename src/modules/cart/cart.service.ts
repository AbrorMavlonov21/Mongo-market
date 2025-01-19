import { Inject, Injectable } from '@nestjs/common';
import { ICartService } from './interfaces/icart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartDocument } from './entities/cart.entity';
import { ICartRepository } from './interfaces/icart.repository';

@Injectable()
export class CartService implements ICartService {
  constructor(
    @Inject('ICartRepository') private readonly cartRepository: ICartRepository,
  ) {}
  async create(dto: CreateCartDto): Promise<CartDocument> {
    return await this.cartRepository.create(dto);
  }
  async getAll(): Promise<Array<CartDocument>> {
    return await this.cartRepository.getAll();
  }
  async getById(id: string): Promise<CartDocument> {
    return await this.cartRepository.getById(id);
  }
  async update(id: string, dto: UpdateCartDto): Promise<CartDocument> {
    return await this.cartRepository.update(id, dto);
  }
  async delete(id: string): Promise<CartDocument> {
    return await this.cartRepository.delete(id);
  }
}

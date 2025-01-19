import { Injectable } from '@nestjs/common';
import { ICartRepository } from './interfaces/icart.repository';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartDocument, CartEntity } from './entities/cart.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CartRepository implements ICartRepository {
  constructor(
    @InjectModel(CartEntity.name)
    private readonly cartModel: Model<CartDocument>,
  ) {}
  async create(dto: CreateCartDto): Promise<CartDocument> {
    return await this.cartModel.create(dto);
  }
  async getAll(): Promise<Array<CartDocument>> {
    return await this.cartModel.find();
  }
  async getById(id: string): Promise<CartDocument> {
    return await this.cartModel.findById(id);
  }
  async update(id: string, dto: UpdateCartDto): Promise<CartDocument> {
    return await this.cartModel.findByIdAndUpdate(id, dto);
  }
  async delete(id: string): Promise<CartDocument> {
    return await this.cartModel.findByIdAndDelete(id);
  }
}

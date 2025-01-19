import { CreateCartDto } from '../dto/create-cart.dto';
import { UpdateCartDto } from '../dto/update-cart.dto';
import { CartDocument } from '../entities/cart.entity';

export interface ICartRepository {
  create(dto: CreateCartDto): Promise<CartDocument>;
  getAll(): Promise<Array<CartDocument>>;
  getById(id: string): Promise<CartDocument>;
  update(id: string, dto: UpdateCartDto): Promise<CartDocument>;
  delete(id: string): Promise<CartDocument>;
}

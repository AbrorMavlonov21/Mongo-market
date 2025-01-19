import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ICartService } from './interfaces/icart.service';

@Controller('cart')
export class CartController {
  constructor(
    @Inject('ICartService') private readonly cartService: ICartService,
  ) {}

  @Post()
  async create(@Body() createCartDto: CreateCartDto) {
    return await this.cartService.create(createCartDto);
  }

  @Get()
  async findAll() {
    return await this.cartService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.cartService.getById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return await this.cartService.update(id, updateCartDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.cartService.delete(id);
  }
}

import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateUserCDto } from '../user-c/dto/create-user-c.dto';

@Controller('auth-mongo')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login-mongo')
  async login(@Body() createAuthDto: CreateAuthDto) {
    try {
      const resData = await this.authService.login(createAuthDto);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to Login',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('register-mongo')
  async registor(@Body() createUserCDto: CreateUserCDto) {
    try {
      const resData = await this.authService.register(createUserCDto);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to Register',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

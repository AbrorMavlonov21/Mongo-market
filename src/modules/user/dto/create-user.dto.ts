import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  TelegramId: string;

  @IsString()
  @IsNotEmpty()
  language: string;
}

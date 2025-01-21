import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserCDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  fullname?: string;

  @IsOptional()
  @IsIn(['admin', 'user'], { each: true })
  roles?: string[];
}

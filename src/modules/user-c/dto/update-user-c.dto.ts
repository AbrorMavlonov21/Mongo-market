import { PartialType } from '@nestjs/mapped-types';
import { CreateUserCDto } from './create-user-c.dto';

export class UpdateUserCDto extends PartialType(CreateUserCDto) {}

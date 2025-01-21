import { HttpException } from '@nestjs/common';

export class BaseNotFoundException extends HttpException {
  constructor(entityName: string) {
    super(`The ${entityName} is not found`, 404);
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from 'common/base.service';
import { PlaceEntity } from './entities/place.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { IPlaceService } from './interfaces/iplace.service';
import { IPlaceRepository } from './interfaces/iplace.repository';

@Injectable()
export class PlaceService
  extends BaseService<PlaceEntity, CreatePlaceDto, UpdatePlaceDto>
  implements IPlaceService
{
  constructor(
    @Inject('IPlaceRepository')
    private readonly placeRepository: IPlaceRepository,
  ) {
    super(placeRepository, 'Place');
  }
}

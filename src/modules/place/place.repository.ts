import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from 'common/base.repostory';
import { Model } from 'mongoose';
import { IPlaceRepository } from './interfaces/iplace.repository';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { PlaceDocument, PlaceEntity } from './entities/place.entity';

@Injectable()
export class PlaceRepository
  extends BaseRepository<PlaceEntity, CreatePlaceDto, UpdatePlaceDto>
  implements IPlaceRepository
{
  constructor(
    @InjectModel(PlaceEntity.name)
    private placeModel: Model<PlaceDocument>,
  ) {
    super(placeModel);
  }
}

import { BaseRepository } from 'common/base.repostory';
import { PlaceEntity } from '../entities/place.entity';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IPlaceRepository
  extends BaseRepository<PlaceEntity, CreatePlaceDto, UpdatePlaceDto> {}

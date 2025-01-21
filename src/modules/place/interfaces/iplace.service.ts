import { BaseService } from 'common/base.service';
import { PlaceEntity } from '../entities/place.entity';
import { CreatePlaceDto } from '../dto/create-place.dto';
import { UpdatePlaceDto } from '../dto/update-place.dto';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IPlaceService
  extends BaseService<PlaceEntity, CreatePlaceDto, UpdatePlaceDto> {}

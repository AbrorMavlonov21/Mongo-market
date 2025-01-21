import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { PlaceRepository } from './place.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { PlaceEntity, PlaceSchema } from './entities/place.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PlaceEntity.name, schema: PlaceSchema },
    ]),
  ],
  controllers: [PlaceController],
  providers: [
    { provide: 'IPlaceService', useClass: PlaceService },
    { provide: 'IPlaceRepository', useClass: PlaceRepository },
  ],
})
export class PlaceModule {}

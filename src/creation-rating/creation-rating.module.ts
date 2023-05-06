import { Module } from '@nestjs/common';
import { CreationRatingService } from './creation-rating.service';
import { CreationRatingController } from './creation-rating.controller';

@Module({
  controllers: [CreationRatingController],
  providers: [CreationRatingService],
})
export class CreationRatingModule {}

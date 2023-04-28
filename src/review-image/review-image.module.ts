import { Module } from '@nestjs/common';
import { ReviewImageService } from './review-image.service';
import { ReviewImageController } from './review-image.controller';

@Module({
  controllers: [ReviewImageController],
  providers: [ReviewImageService]
})
export class ReviewImageModule {}

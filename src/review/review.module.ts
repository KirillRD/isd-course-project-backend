import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { ImageKitModule } from 'src/image-kit/image-kit.module';
import { CreationModule } from 'src/creation/creation.module';

@Module({
  imports: [ImageKitModule, CreationModule],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}

import { Module } from '@nestjs/common';
import { ReviewCommentService } from './review-comment.service';
import { ReviewCommentController } from './review-comment.controller';

@Module({
  controllers: [ReviewCommentController],
  providers: [ReviewCommentService]
})
export class ReviewCommentModule {}

import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ReviewCommentService } from './review-comment.service';
import { CreateReviewCommentDto } from './dto/create-review-comment.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { Csrf } from 'ncsrf';
import { ReviewComment } from '@prisma/client';

@Controller('review-comments')
export class ReviewCommentController {
  constructor(private readonly reviewCommentService: ReviewCommentService) {}

  @Post()
  @Csrf()
  @UseGuards(AccessTokenGuard)
  async create(@Body() createReviewCommentDto: CreateReviewCommentDto) {
    return await this.reviewCommentService.create(createReviewCommentDto);
  }

  @Get()
  async find(
    @Query('reviewId', ParseIntPipe) reviewId: number,
  ): Promise<ReviewComment[]> {
    return await this.reviewCommentService.find(reviewId);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
  Put,
  Req,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CreationCategory, Review } from '@prisma/client';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { Csrf } from 'ncsrf';
import { ReviewDto } from 'src/review/dto/review.dto';
import { AuthUserId } from 'src/auth/decorators/auth-user-id.decorator';
import { ReviewOrderOptions } from 'src/review/queries/find-reviews.query';
import { TagIdsPipe } from 'src/review/pipes/tag-ids.pipe';
import { CreationIdPipe } from 'src/review/pipes/creation-id.pipe';
import { OrderPipe } from 'src/review/pipes/order.pipe';
import { SizePipe } from 'src/review/pipes/size.pipe';
import { PagePipe } from 'src/review/pipes/page.pipe';
import { CreationCategoriesPipe } from 'src/review/pipes/creation-categories.pipe';
import { ReviewTitlePipe } from 'src/review/pipes/review-title.pipe';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @Csrf()
  @UseGuards(AccessTokenGuard)
  async create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return await this.reviewService.create(createReviewDto);
  }

  @Get('/count')
  async count(
    @Query('review', ReviewTitlePipe) reviewTitle: string | undefined,
    @Query('creation', CreationIdPipe) creationId: number | undefined,
    @Query('tag', TagIdsPipe) tagIds: number[] | undefined,
    @Query('creation-category', CreationCategoriesPipe)
    creationCategories: CreationCategory[] | undefined,
  ): Promise<number> {
    return await this.reviewService.count({
      reviewTitle,
      creationId,
      tagIds,
      creationCategories,
    });
  }

  @Get()
  async find(
    @Query('page', PagePipe) page: number,
    @Query('size', SizePipe) size: number,
    @Query('order', OrderPipe) order: ReviewOrderOptions,
    @Query('review', ReviewTitlePipe) reviewTitle: string | undefined,
    @Query('creation', CreationIdPipe) creationId: number | undefined,
    @Query('tag', TagIdsPipe) tagIds: number[] | undefined,
    @Query('creation-category', CreationCategoriesPipe)
    creationCategories: CreationCategory[] | undefined,
  ) {
    return await this.reviewService.find({
      page,
      size,
      order,
      reviewTitle,
      creationId,
      tagIds,
      creationCategories,
    });
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @AuthUserId() userId: number | undefined,
  ): Promise<ReviewDto> {
    return await this.reviewService.findOneById(id, userId);
  }

  @Put(':id')
  @Csrf()
  @UseGuards(AccessTokenGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    return await this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @Csrf()
  @UseGuards(AccessTokenGuard)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Review> {
    return await this.reviewService.delete(id);
  }
}

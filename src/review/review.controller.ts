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
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from '@prisma/client';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { Csrf } from 'ncsrf';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @Csrf()
  @UseGuards(AccessTokenGuard)
  async create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
    return await this.reviewService.create(createReviewDto);
  }

  @Get()
  async find(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
  ): Promise<Review[]> {
    return await this.reviewService.find(page, size);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Review> {
    return await this.reviewService.findOneById(id);
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

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReviewImageService } from './review-image.service';
import { CreateReviewImageDto } from './dto/create-review-image.dto';
import { UpdateReviewImageDto } from './dto/update-review-image.dto';

@Controller('review-image')
export class ReviewImageController {
  constructor(private readonly reviewImageService: ReviewImageService) {}

  @Post()
  create(@Body() createReviewImageDto: CreateReviewImageDto) {
    return this.reviewImageService.create(createReviewImageDto);
  }

  @Get()
  findAll() {
    return this.reviewImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewImageDto: UpdateReviewImageDto) {
    return this.reviewImageService.update(+id, updateReviewImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewImageService.remove(+id);
  }
}

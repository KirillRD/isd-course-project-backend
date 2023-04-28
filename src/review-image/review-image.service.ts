import { Injectable } from '@nestjs/common';
import { CreateReviewImageDto } from './dto/create-review-image.dto';
import { UpdateReviewImageDto } from './dto/update-review-image.dto';

@Injectable()
export class ReviewImageService {
  create(createReviewImageDto: CreateReviewImageDto) {
    return 'This action adds a new reviewImage';
  }

  findAll() {
    return `This action returns all reviewImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reviewImage`;
  }

  update(id: number, updateReviewImageDto: UpdateReviewImageDto) {
    return `This action updates a #${id} reviewImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} reviewImage`;
  }
}

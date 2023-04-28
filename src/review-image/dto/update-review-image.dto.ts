import { PartialType } from '@nestjs/mapped-types';
import { CreateReviewImageDto } from './create-review-image.dto';

export class UpdateReviewImageDto extends PartialType(CreateReviewImageDto) {}

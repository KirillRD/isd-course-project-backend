import { OmitType } from '@nestjs/mapped-types';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';

export class UpdateReviewDto extends OmitType(CreateReviewDto, [
  'userId',
  'creationId',
] as const) {}

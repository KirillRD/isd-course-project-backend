import { Review } from '@prisma/client';
import { OmitType } from '@nestjs/mapped-types';

interface IReview extends Review {}
class ReviewEntity implements IReview {
  id: number;
  userId: number;
  creationId: number;
  title: string;
  body: string;
  grade: number;
  createDate: Date;
}

export class ReviewSchema extends OmitType(ReviewEntity, ['body'] as const) {
  body?: string;
}

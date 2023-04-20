import { Max, Min } from 'class-validator';
import { Exception } from 'src/exceptions';

export class CreateReviewDto {
  userId: number;
  creationId: number;
  title: string;
  body: string;

  @Min(1, { message: Exception.REVIEW_GRADE_INVALID_FORMAT })
  @Max(10, { message: Exception.REVIEW_GRADE_INVALID_FORMAT })
  grade: number;
}

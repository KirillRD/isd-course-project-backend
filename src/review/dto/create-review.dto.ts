import { Max, Min } from 'class-validator';
import { Exception } from 'src/exceptions';
import { ReviewImageDto } from 'src/review-image/dto/review-image.dto';
import { TagDto } from 'src/tag/dto/tag.dto';

export class CreateReviewDto {
  userId: number;
  creationId: number;
  title: string;
  body: string;

  @Min(0, { message: Exception.REVIEW_GRADE_INVALID_FORMAT })
  @Max(10, { message: Exception.REVIEW_GRADE_INVALID_FORMAT })
  grade: number;
  tags?: TagDto[];
  images?: ReviewImageDto[];
}

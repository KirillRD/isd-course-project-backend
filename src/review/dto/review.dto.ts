import { ReviewImage, Tag, User } from '@prisma/client';
import { CreationDto } from 'src/creation/dto/creation.dto';
import { ReviewSchema } from 'src/review/schemas/review-schema.schema';

export class ReviewDto implements ReviewSchema {
  id: number;
  userId: number;
  creationId: number;
  title: string;
  body?: string;
  grade: number;
  createDate: Date;
  user?: User;
  creation?: CreationDto;
  tags?: Tag[];
  images?: ReviewImage[];
  _count?: {
    userLikes?: number;
  };
  userLike?: boolean;
}

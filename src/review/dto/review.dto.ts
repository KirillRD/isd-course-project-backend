import { ReviewImage, Tag, User } from '@prisma/client';
import { CreationDto } from 'src/creation/dto/creation.dto';
import { ReviewSchema } from 'src/review/schemas/review-schema.schema';

export class ReviewDto implements ReviewSchema {
  id: number;
  userId: number;
  creationId: number;
  title: string;
  body: string;
  grade: number;
  createDate: Date;
  user?: {
    id: number;
    name: string;
    reviews: {
      _count: {
        userLikes: number;
      };
    }[];
  };
  creation?: CreationDto;
  tags?: Tag[];
  images?: ReviewImage[];
  userLikes?: User[];
  _count?: {
    userLikes?: number;
    comments?: number;
  };
}

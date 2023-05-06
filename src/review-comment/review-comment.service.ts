import { Injectable } from '@nestjs/common';
import { CreateReviewCommentDto } from './dto/create-review-comment.dto';
import { ReviewComment } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ReviewCommentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReviewCommentDto: CreateReviewCommentDto) {
    return await this.prisma.reviewComment.create({
      data: createReviewCommentDto,
    });
  }

  async find(reviewId: number): Promise<ReviewComment[]> {
    return await this.prisma.reviewComment.findMany({
      where: {
        reviewId,
      },
      include: {
        user: {
          include: {
            _count: {
              select: {
                reviewLikes: true,
              },
            },
          },
        },
      },
    });
  }
}

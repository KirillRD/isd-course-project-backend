import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { LikeDto } from 'src/like/dto/like.dto';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(likeDto: LikeDto) {
    return await this.prisma.review.update({
      where: { id: likeDto.reviewId },
      data: {
        userLikes: {
          connect: {
            id: likeDto.userId,
          },
        },
      },
    });
  }

  async delete(likeDto: LikeDto) {
    return await this.prisma.review.update({
      where: { id: likeDto.reviewId },
      data: {
        userLikes: {
          disconnect: {
            id: likeDto.userId,
          },
        },
      },
    });
  }
}

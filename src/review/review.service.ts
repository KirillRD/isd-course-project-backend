import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Review } from '@prisma/client';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    return await this.prisma.review.create({
      data: createReviewDto,
    });
  }

  async find(page: number, size: number): Promise<Review[]> {
    return await this.prisma.review.findMany({
      skip: size * page - size,
      take: size,
    });
  }

  async findOneById(id: number): Promise<Review | null> {
    return await this.prisma.review.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    return await this.prisma.review.update({
      where: { id },
      data: updateReviewDto,
    });
  }

  async remove(id: number): Promise<Review> {
    return await this.prisma.review.delete({
      where: { id },
    });
  }
}

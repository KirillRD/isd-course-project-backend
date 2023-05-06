import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review, ReviewImage } from '@prisma/client';
import { ImageKitService } from 'src/image-kit/image-kit.service';
import { ReviewDto } from 'src/review/dto/review.dto';
import { CreationService } from 'src/creation/creation.service';
import {
  CountReviewsQuery,
  FindReviewsQuery,
} from 'src/review/queries/find-reviews.query';
import { reviewOrderOptions } from './queries/find-reviews.query';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ReviewService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imageKit: ImageKitService,
    private readonly creationService: CreationService,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const { tags, images: imageFiles, ...review } = createReviewDto;
    const images = await this.imageKit.uploadImages(
      imageFiles.map((imageFile) => imageFile.file),
    );
    return await this.prisma.review.create({
      data: {
        ...review,
        tags: {
          connectOrCreate: tags.map((tag) => ({
            where: { id: tag.id ?? 0 },
            create: { name: tag.name },
          })),
        },
        images: {
          createMany: {
            data: images,
          },
        },
      },
    });
  }

  async count(queries: CountReviewsQuery): Promise<number> {
    return await this.prisma.review.count({
      where: {
        title: {
          contains: queries.reviewTitle,
          mode: 'insensitive',
        },
        creation: {
          id: queries.creationId,
          category: {
            in: queries.creationCategories,
          },
        },
        ...(queries.tagIds && {
          tags: {
            some: {
              id: {
                in: queries.tagIds,
              },
            },
          },
        }),
      },
    });
  }

  async find(queries: FindReviewsQuery): Promise<ReviewDto[]> {
    const reviews = await this.prisma.review.findMany({
      skip: queries.size * queries.page - queries.size,
      take: queries.size,
      where: {
        title: {
          contains: queries.reviewTitle,
          mode: 'insensitive',
        },
        creation: {
          id: queries.creationId,
          category: {
            in: queries.creationCategories,
          },
        },
        ...(queries.tagIds && {
          tags: {
            some: {
              id: {
                in: queries.tagIds,
              },
            },
          },
        }),
      },
      orderBy: {
        ...reviewOrderOptions[queries.order],
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
        creation: true,
        tags: true,
        _count: {
          select: {
            userLikes: true,
          },
        },
      },
    });
    return await Promise.all(
      reviews.map(async (review) => {
        const creationAverageRating =
          await this.creationService.getAverageRating(review.creation.id);
        const reviewDto = { ...review } as unknown as ReviewDto;
        reviewDto.creation.averageRating = creationAverageRating;
        return reviewDto;
      }),
    );
  }

  async getReview(id: number): Promise<Review> {
    return await this.prisma.review.findUniqueOrThrow({
      where: { id },
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
        tags: true,
        images: true,
        _count: {
          select: {
            userLikes: true,
          },
        },
      },
    });
  }

  async getUserLike(userId: number, reviewId: number): Promise<boolean> {
    return !!(await this.prisma.review.findFirst({
      where: {
        id: reviewId,
        userLikes: {
          some: {
            id: userId,
          },
        },
      },
    }));
  }

  async findOneById(id: number, userId?: number): Promise<ReviewDto> {
    const review = await this.getReview(id);
    const creation = await this.creationService.findOneById(
      review.creationId,
      userId,
    );

    const reviewDto: ReviewDto = {
      ...review,
      creation,
    };

    if (userId) {
      const userLike = await this.getUserLike(userId, id);
      reviewDto.userLike = userLike;
    }

    return reviewDto;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const { tags, images: imageFiles, ...review } = updateReviewDto;
    const oldImages = ((await this.findOneById(id)) as any)
      .images as ReviewImage[];
    this.imageKit.deleteImages(oldImages.map((oldImage) => oldImage.fileId));
    const images = await this.imageKit.uploadImages(
      imageFiles.map((imageFile) => imageFile.file),
    );
    return await this.prisma.review.update({
      where: { id },
      data: {
        ...review,
        tags: {
          set: [],
          connectOrCreate: tags.map((tag) => ({
            where: { id: tag.id ?? 0 },
            create: { name: tag.name },
          })),
        },
        images: {
          deleteMany: {},
          createMany: {
            data: images,
          },
        },
      },
    });
  }

  async delete(id: number): Promise<Review> {
    return await this.prisma.review.delete({
      where: { id },
    });
  }
}

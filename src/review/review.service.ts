import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Review, ReviewImage } from '@prisma/client';
import { ImageKitService } from 'src/image-kit/image-kit.service';

@Injectable()
export class ReviewService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imageKit: ImageKitService,
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

  async find(page: number, size: number): Promise<Review[]> {
    return await this.prisma.review.findMany({
      skip: size * page - size,
      take: size,
    });
  }

  async findOneById(id: number): Promise<Review | null> {
    return await this.prisma.review.findUniqueOrThrow({
      where: { id },
      include: {
        user: true,
        creation: true,
        tags: true,
        images: true,
      },
    });
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

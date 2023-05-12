import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCreationDto } from './dto/create-creation.dto';
import { UpdateCreationDto } from './dto/update-creation.dto';
import { Creation, CreationCategory } from '@prisma/client';
import { Exception } from 'src/exceptions';
import { CreationDto } from 'src/creation/dto/creation.dto';
import { PrismaService } from 'nestjs-prisma';
import { ImageKitService } from 'src/image-kit/image-kit.service';

@Injectable()
export class CreationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly imageKit: ImageKitService,
  ) {}

  async create(createCreationDto: CreateCreationDto): Promise<Creation> {
    const creationExists = await this.findOneByTitleAndCategory(
      createCreationDto.title,
      createCreationDto.category,
    );
    if (creationExists)
      throw new ConflictException(Exception.CREATION_TITLE_AND_CATEGORY_EXISTS);
    const { imageFile, ...creation } = createCreationDto;
    const image = (await this.imageKit.uploadImages([imageFile]))[0];
    return await this.prisma.creation.create({
      data: {
        ...creation,
        imageId: image.fileId,
        imageUrl: image.url,
      },
    });
  }

  async find(search: string, userId?: number): Promise<CreationDto[]> {
    const creations: CreationDto[] = await this.prisma.creation.findMany({
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
      include: {
        ...(userId && {
          ratings: {
            where: {
              userId,
            },
          },
        }),
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      orderBy: {
        title: 'asc',
      },
    });

    return await Promise.all(
      creations.map(async (creation) => {
        creation.averageRating = await this.getAverageRating(creation.id);
        return creation;
      }),
    );
  }

  async findOneByTitleAndCategory(
    title: string,
    category: CreationCategory,
  ): Promise<Creation | null> {
    return await this.prisma.creation.findFirst({
      where: {
        title: {
          equals: title,
          mode: 'insensitive',
        },
        category,
      },
    });
  }

  async getAverageRating(creationId: number): Promise<number> {
    const averageRating = (
      (await this.prisma.creationRating.aggregate({
        _avg: { rating: true },
        where: {
          creationId,
        },
      })) as any
    )._avg.rating as number | null;
    return averageRating ?? 0;
  }

  async findOneById(id: number, userId?: number): Promise<CreationDto> {
    const creation: CreationDto = await this.prisma.creation.findUniqueOrThrow({
      where: { id },
      include: {
        ...(userId && {
          ratings: {
            where: {
              userId,
            },
          },
        }),
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    });

    creation.averageRating = await this.getAverageRating(id);

    return creation;
  }
}

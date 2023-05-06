import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCreationDto } from './dto/create-creation.dto';
import { UpdateCreationDto } from './dto/update-creation.dto';
import { Creation, CreationCategory } from '@prisma/client';
import { Exception } from 'src/exceptions';
import { CreationDto } from 'src/creation/dto/creation.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CreationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCreationDto: CreateCreationDto): Promise<Creation> {
    const creation = await this.findOneByTitleAndCategory(
      createCreationDto.title,
      createCreationDto.category,
    );
    if (creation)
      throw new ConflictException(Exception.CREATION_TITLE_AND_CATEGORY_EXISTS);
    return await this.prisma.creation.create({
      data: createCreationDto,
    });
  }

  async find(search: string): Promise<Creation[]> {
    return await this.prisma.creation.findMany({
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
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

  async getUserRating(userId: number, creationId: number): Promise<number> {
    const creationRating = await this.prisma.creationRating.findFirst({
      where: {
        userId,
        creationId,
      },
    });
    return creationRating ? creationRating.rating : 0;
  }

  async findOneById(id: number, userId?: number): Promise<CreationDto> {
    const creation = await this.prisma.creation.findUniqueOrThrow({
      where: { id },
    });
    const averageRating = await this.getAverageRating(id);

    const creationDto: CreationDto = {
      ...creation,
      averageRating,
    };

    if (userId) {
      const userRating = await this.getUserRating(userId, id);
      creationDto.userRating = userRating;
    }

    return creationDto;
  }

  // update(id: number, updateCreationDto: UpdateCreationDto) {
  //   return `This action updates a #${id} creation`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} creation`;
  // }
}

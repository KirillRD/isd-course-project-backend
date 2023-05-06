import { Injectable } from '@nestjs/common';
import { CreationRatingDto } from './dto/creation-rating.dto';
import { DeleteCreationRatingDto } from './dto/delete-creation-rating.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CreationRatingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(creationRatingDto: CreationRatingDto) {
    return await this.prisma.creationRating.create({
      data: {
        ...creationRatingDto,
      },
    });
  }

  async update(creationRatingDto: CreationRatingDto) {
    const { rating, ...creationId_userId } = creationRatingDto;
    return await this.prisma.creationRating.update({
      where: {
        creationId_userId,
      },
      data: {
        rating,
      },
    });
  }

  async delete(deleteCreationRatingDto: DeleteCreationRatingDto) {
    return await this.prisma.creationRating.delete({
      where: {
        creationId_userId: deleteCreationRatingDto,
      },
    });
  }
}

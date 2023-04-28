import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCreationDto } from './dto/create-creation.dto';
import { UpdateCreationDto } from './dto/update-creation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Creation, CreationCategory } from '@prisma/client';
import { Exception } from 'src/exceptions';

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

  async findOneById(id: number): Promise<Creation | null> {
    return await this.prisma.creation.findUniqueOrThrow({
      where: { id },
    });
  }

  // update(id: number, updateCreationDto: UpdateCreationDto) {
  //   return `This action updates a #${id} creation`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} creation`;
  // }
}

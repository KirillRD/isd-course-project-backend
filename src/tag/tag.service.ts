import { Injectable } from '@nestjs/common';
import { Tag } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}

  async find(search: string, tagIds: undefined | number[]): Promise<Tag[]> {
    return await this.prisma.tag.findMany({
      where: {
        id: {
          in: tagIds,
        },
        name: {
          startsWith: search,
          mode: 'insensitive',
        },
      },
      include: {
        _count: {
          select: {
            reviews: true,
          },
        },
      },
    });
  }
}

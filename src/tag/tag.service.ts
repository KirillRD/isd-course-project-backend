import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Tag } from '@prisma/client';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}

  async find(search: string): Promise<Tag[]> {
    return await this.prisma.tag.findMany({
      where: {
        name: {
          startsWith: search,
          mode: 'insensitive',
        },
      },
    });
  }

  // create(createTagDto: CreateTagDto) {
  //   return 'This action adds a new tag';
  // }

  // findAll() {
  //   return `This action returns all tag`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} tag`;
  // }

  // update(id: number, updateTagDto: UpdateTagDto) {
  //   return `This action updates a #${id} tag`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} tag`;
  // }
}

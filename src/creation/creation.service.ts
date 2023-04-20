import { Injectable } from '@nestjs/common';
import { CreateCreationDto } from './dto/create-creation.dto';
import { UpdateCreationDto } from './dto/update-creation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Creation } from '@prisma/client';

@Injectable()
export class CreationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCreationDto: CreateCreationDto): Promise<Creation> {
    return await this.prisma.creation.create({
      data: createCreationDto,
    });
  }

  // findAll() {
  //   return `This action returns all creation`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} creation`;
  // }

  // update(id: number, updateCreationDto: UpdateCreationDto) {
  //   return `This action updates a #${id} creation`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} creation`;
  // }
}

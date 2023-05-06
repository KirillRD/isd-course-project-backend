import { Controller, Get, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from '@prisma/client';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async find(@Query('search') search: string): Promise<Tag[]> {
    return await this.tagService.find(search);
  }
}

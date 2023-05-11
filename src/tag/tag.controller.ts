import { Controller, Get, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from '@prisma/client';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async find(
    @Query('search') search: string,
    @Query('tag') tags: undefined | string | string[],
  ): Promise<Tag[]> {
    const tagIds =
      tags !== undefined ? [tags].flat().map((tag) => +tag) : undefined;
    return await this.tagService.find(search, tagIds);
  }
}

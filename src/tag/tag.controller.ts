import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { Tag } from '@prisma/client';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  async find(@Query('search') search: string): Promise<Tag[]> {
    return await this.tagService.find(search);
  }

  // @Post()
  // create(@Body() createTagDto: CreateTagDto) {
  //   return this.tagService.create(createTagDto);
  // }

  // @Get()
  // findAll() {
  //   return this.tagService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tagService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
  //   return this.tagService.update(+id, updateTagDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tagService.remove(+id);
  // }
}

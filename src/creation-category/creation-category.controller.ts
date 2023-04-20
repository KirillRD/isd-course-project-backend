import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreationCategoryService } from './creation-category.service';

@Controller('creation-category')
export class CreationCategoryController {
  constructor(
    private readonly creationCategoryService: CreationCategoryService,
  ) {}

  // @Post()
  // create(@Body() createCreationCategoryDto: CreateCreationCategoryDto) {
  //   return this.creationCategoryService.create(createCreationCategoryDto);
  // }

  // @Get()
  // findAll() {
  //   return this.creationCategoryService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.creationCategoryService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCreationCategoryDto: UpdateCreationCategoryDto) {
  //   return this.creationCategoryService.update(+id, updateCreationCategoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.creationCategoryService.remove(+id);
  // }
}

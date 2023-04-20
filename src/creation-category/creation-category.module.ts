import { Module } from '@nestjs/common';
import { CreationCategoryService } from './creation-category.service';
import { CreationCategoryController } from './creation-category.controller';

@Module({
  controllers: [CreationCategoryController],
  providers: [CreationCategoryService],
})
export class CreationCategoryModule {}

import { Controller, Post, Body, Delete, Put, UseGuards } from '@nestjs/common';
import { CreationRatingService } from './creation-rating.service';
import { CreationRatingDto } from 'src/creation-rating/dto/creation-rating.dto';
import { DeleteCreationRatingDto } from 'src/creation-rating/dto/delete-creation-rating.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { Csrf } from 'ncsrf';

@Controller('creation-ratings')
export class CreationRatingController {
  constructor(private readonly creationRatingService: CreationRatingService) {}

  @Csrf()
  @UseGuards(AccessTokenGuard)
  @Post()
  async create(@Body() creationRatingDto: CreationRatingDto) {
    return await this.creationRatingService.create(creationRatingDto);
  }

  @Csrf()
  @UseGuards(AccessTokenGuard)
  @Put()
  async update(@Body() creationRatingDto: CreationRatingDto) {
    return await this.creationRatingService.update(creationRatingDto);
  }

  @Csrf()
  @UseGuards(AccessTokenGuard)
  @Delete()
  async delete(@Body() deleteCreationRatingDto: DeleteCreationRatingDto) {
    return await this.creationRatingService.delete(deleteCreationRatingDto);
  }
}

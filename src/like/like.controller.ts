import { Controller, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeDto } from 'src/like/dto/like.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { Csrf } from 'ncsrf';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Csrf()
  @UseGuards(AccessTokenGuard)
  @Post()
  async create(@Body() likeDto: LikeDto) {
    return await this.likeService.create(likeDto);
  }

  @Csrf()
  @UseGuards(AccessTokenGuard)
  @Delete()
  async delete(@Body() likeDto: LikeDto) {
    return await this.likeService.delete(likeDto);
  }
}

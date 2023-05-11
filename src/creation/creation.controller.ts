import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Creation } from '@prisma/client';
import { Csrf } from 'ncsrf';
import { AuthUserId } from 'src/auth/decorators/auth-user-id.decorator';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { CreationDto } from 'src/creation/dto/creation.dto';
import { CreationService } from './creation.service';
import { CreateCreationDto } from './dto/create-creation.dto';

@Controller('creations')
export class CreationController {
  constructor(private readonly creationService: CreationService) {}

  @Post()
  @Csrf()
  @UseGuards(AccessTokenGuard)
  async create(
    @Body() createCreationDto: CreateCreationDto,
  ): Promise<Creation> {
    return await this.creationService.create(createCreationDto);
  }

  @Get()
  async find(
    @Query('search') search: string,
    @AuthUserId() userId: number | undefined,
  ): Promise<Creation[]> {
    return await this.creationService.find(search, userId);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @AuthUserId() userId: number | undefined,
  ): Promise<CreationDto> {
    return await this.creationService.findOneById(id, userId);
  }
}

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
  ParseIntPipe,
} from '@nestjs/common';
import { CreationService } from './creation.service';
import { CreateCreationDto } from './dto/create-creation.dto';
import { UpdateCreationDto } from './dto/update-creation.dto';
import { Creation } from '@prisma/client';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { Csrf } from 'ncsrf';
import { CreationDto } from 'src/creation/dto/creation.dto';
import { AuthUserId } from 'src/auth/decorators/auth-user-id.decorator';

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
  async find(@Query('search') search: string): Promise<Creation[]> {
    return await this.creationService.find(search);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @AuthUserId() userId: number | undefined,
  ): Promise<CreationDto> {
    return await this.creationService.findOneById(id, userId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCreationDto: UpdateCreationDto) {
  //   return this.creationService.update(+id, updateCreationDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.creationService.remove(+id);
  // }
}

import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, User } from '@prisma/client';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { AuthUserData } from 'src/auth/types';
import { Exception } from 'src/exceptions';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/count')
  @Roles(Role.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  async count(@Query('search') search: string): Promise<number> {
    return await this.userService.count(search);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  async find(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('search') search: string,
  ): Promise<User[]> {
    return await this.userService.find(page, size, search);
  }

  @Get(':id')
  @UseGuards(AccessTokenGuard)
  async findOne(
    @AuthUser() authUser: AuthUserData,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    if (!authUser.user.roles.includes(Role.ADMIN) && authUser.user.id != id) {
      throw new ForbiddenException(Exception.USER_ROLE_ACCESS_DENIED);
    }
    return await this.userService.findOneByIdOrThrow(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.delete(id);
  }
}

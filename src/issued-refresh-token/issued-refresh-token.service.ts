import { Injectable } from '@nestjs/common';
import { CreateIssuedRefreshTokenDto } from './dto/create-issued-refresh-token.dto';
import { IssuedRefreshToken } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class IssuedRefreshTokenService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createIssuedRefreshTokenDto: CreateIssuedRefreshTokenDto,
  ): Promise<IssuedRefreshToken> {
    return await this.prisma.issuedRefreshToken.create({
      data: createIssuedRefreshTokenDto,
    });
  }

  async findAllByUserId(userId: number): Promise<IssuedRefreshToken[]> {
    return await this.prisma.issuedRefreshToken.findMany({
      where: {
        userId,
      },
    });
  }

  async findOneByRefreshToken(
    refreshToken: string,
  ): Promise<IssuedRefreshToken> {
    return await this.prisma.issuedRefreshToken.findFirst({
      where: {
        refreshToken,
      },
    });
  }

  async remove(refreshTokenId: number): Promise<IssuedRefreshToken> {
    return await this.prisma.issuedRefreshToken.delete({
      where: {
        id: refreshTokenId,
      },
    });
  }
}

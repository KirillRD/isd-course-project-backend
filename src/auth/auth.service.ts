import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';
import { LoginDto } from 'src/auth/dto/login.dto';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { JwtPayload, Tokens } from 'src/auth/types';
import { Exception } from 'src/exceptions';
import { UserService } from 'src/user/user.service';
import { IssuedRefreshTokenService } from './../issued-refresh-token/issued-refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly issuedRefreshTokenService: IssuedRefreshTokenService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<Tokens> {
    const userExists = await this.userService.findOneByEmail(signUpDto.email);
    if (userExists) throw new ConflictException(Exception.USER_EMAIL_EXISTS);

    const user = await this.userService.create({
      ...signUpDto,
      password: await this.hashData(signUpDto.password),
    });

    const tokens = await this.generateAndUpdateTokens(user);
    return tokens;
  }

  async login(loginDto: LoginDto): Promise<Tokens> {
    const user = await this.userService.findOneByEmail(loginDto.email);
    if (
      !user ||
      !(await this.verifyDataByHash(user.password, loginDto.password))
    ) {
      throw new UnauthorizedException(Exception.USER_CREDENTIAL_INVALID);
    }

    if (user.isLock) throw new ForbiddenException(Exception.USER_IS_LOCK);

    const tokens = await this.generateAndUpdateTokens(user);
    return tokens;
  }

  async logout(refreshTokenId: number) {
    this.issuedRefreshTokenService.remove(refreshTokenId);
  }

  async refreshTokens(user: User, refreshTokenId: number): Promise<Tokens> {
    this.issuedRefreshTokenService.remove(refreshTokenId);
    const tokens = await this.generateAndUpdateTokens(user);
    return tokens;
  }

  async verifyDataByHash(hash: string, data: string): Promise<boolean> {
    return await argon2.verify(hash, data);
  }

  private async generateAndUpdateTokens(user: User): Promise<Tokens> {
    const tokens = this.generateTokens(user.id);
    await this.createRefreshToken(
      user.id,
      await this.hashData(tokens.refreshToken),
    );
    return tokens;
  }

  private async createRefreshToken(userId: number, refreshToken: string) {
    await this.issuedRefreshTokenService.create({
      userId,
      refreshToken,
    });
  }

  private async hashData(data: string): Promise<string> {
    return await argon2.hash(data);
  }

  private generateTokens(userId: number): Tokens {
    const jwtPayload = this.generateJwtPayload(userId);
    const accessToken = this.generateAccessToken(jwtPayload);
    const refreshToken = this.generateRefreshToken(jwtPayload);
    return {
      accessToken,
      refreshToken,
    };
  }

  private generateJwtPayload(userId: number): JwtPayload {
    return {
      sub: userId,
    };
  }

  private generateAccessToken(jwtPayload: JwtPayload): string {
    return this.jwtService.sign(jwtPayload, {
      secret: this.config.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.config.get('JWT_ACCESS_TOKEN_EXPIRATION'),
    });
  }

  private generateRefreshToken(jwtPayload: JwtPayload): string {
    return this.jwtService.sign(jwtPayload, {
      secret: this.config.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.config.get('JWT_REFRESH_TOKEN_EXPIRATION'),
    });
  }
}

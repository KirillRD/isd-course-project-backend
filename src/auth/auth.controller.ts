import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Res,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { Csrf } from 'ncsrf';
import { Response } from 'express';
import {
  REFRESH_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE_OPTIONS,
  REFRESH_TOKEN_PATH,
} from 'src/auth/constants';
import { RefreshTokenGuard } from 'src/auth/guards/refresh-token.guard';
import { AccessTokenGuard } from 'src/auth/guards/access-token.guard';
import {
  AccessTokenResponse,
  AuthUserData,
  CsrfTokenResponse,
} from 'src/auth/types';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import { excludeUserKeys } from 'src/user/util';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('/csrf-token')
  @HttpCode(HttpStatus.OK)
  getCsrfToken(@Req() req): CsrfTokenResponse {
    return { csrfToken: req.csrfToken() };
  }

  @Post('/sign-up')
  @Csrf()
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessTokenResponse> {
    const tokens = await this.authService.signUp(signUpDto);
    this.setRefreshTokenCookie(res, tokens.refreshToken);
    return { accessToken: tokens.accessToken };
  }

  @Post('login')
  @Csrf()
  @HttpCode(HttpStatus.CREATED)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessTokenResponse> {
    const tokens = await this.authService.login(loginDto);
    this.setRefreshTokenCookie(res, tokens.refreshToken);
    return { accessToken: tokens.accessToken };
  }

  @Post(`${REFRESH_TOKEN_PATH}/logout`)
  @Csrf()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard, RefreshTokenGuard)
  async logout(
    @AuthUser() authUserData: AuthUserData,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(authUserData.refreshTokenId);
    this.removeRefreshTokenCookie(res);
  }

  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  async profile(
    @AuthUser() authUserData: AuthUserData,
  ): Promise<Omit<User, 'password'>> {
    return excludeUserKeys(
      await this.userService.findOneById(authUserData.user.id),
      ['password'],
    );
  }

  @Post(`${REFRESH_TOKEN_PATH}/refresh-tokens`)
  @Csrf()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RefreshTokenGuard)
  async refreshTokens(
    @AuthUser() authUserData: AuthUserData,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessTokenResponse> {
    const tokens = await this.authService.refreshTokens(
      authUserData.user,
      authUserData.refreshTokenId,
    );
    this.setRefreshTokenCookie(res, tokens.refreshToken);
    return { accessToken: tokens.accessToken };
  }

  private setRefreshTokenCookie(res: Response, refreshToken: string) {
    res.cookie(
      REFRESH_TOKEN_COOKIE,
      refreshToken,
      REFRESH_TOKEN_COOKIE_OPTIONS,
    );
  }

  private removeRefreshTokenCookie(res: Response) {
    res.clearCookie(REFRESH_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE_OPTIONS);
  }

  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}

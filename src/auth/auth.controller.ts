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
import { AuthType, User } from '@prisma/client';
import { excludeUserKeys } from 'src/user/util';
import { GoogleService } from 'src/auth/google.service';
import { SocialLoginDto } from 'src/auth/dto/social-login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly googleService: GoogleService,
  ) {}

  @Get('csrf-token')
  getCsrfToken(@Req() req): CsrfTokenResponse {
    return { csrfToken: req.csrfToken() };
  }

  async signUp(
    signUpDto: SignUpDto,
    response: Response,
  ): Promise<AccessTokenResponse> {
    const tokens = await this.authService.signUp(signUpDto);
    this.setRefreshTokenCookie(response, tokens.refreshToken);
    return { accessToken: tokens.accessToken };
  }

  async login(
    loginDto: LoginDto,
    response: Response,
  ): Promise<AccessTokenResponse> {
    const tokens = await this.authService.login(loginDto);
    this.setRefreshTokenCookie(response, tokens.refreshToken);
    return { accessToken: tokens.accessToken };
  }

  async socialLogin(
    socialLoginDto: SocialLoginDto,
    response: Response,
  ): Promise<AccessTokenResponse> {
    const tokens = await this.authService.socialLogin(socialLoginDto);
    this.setRefreshTokenCookie(response, tokens.refreshToken);
    return { accessToken: tokens.accessToken };
  }

  @Post('sign-up')
  @Csrf()
  async signUpPassword(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessTokenResponse> {
    return await this.signUp(signUpDto, res);
  }

  @Post('login')
  @Csrf()
  async loginPassword(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessTokenResponse> {
    return await this.login(loginDto, res);
  }

  @Post(`${REFRESH_TOKEN_PATH}/logout`)
  @Csrf()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard, RefreshTokenGuard)
  async logout(
    @AuthUser() authUser: AuthUserData,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logout(authUser.refreshTokenId);
    this.removeRefreshTokenCookie(res);
  }

  @Get('profile')
  @UseGuards(AccessTokenGuard)
  async profile(
    @AuthUser() authUser: AuthUserData,
  ): Promise<Omit<User, 'password'>> {
    return excludeUserKeys(
      await this.userService.findOneById(authUser.user.id),
      ['password'],
    );
  }

  @Post(`${REFRESH_TOKEN_PATH}/refresh-tokens`)
  @UseGuards(RefreshTokenGuard)
  async refreshTokens(
    @AuthUser() authUser: AuthUserData,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessTokenResponse> {
    const tokens = await this.authService.refreshTokens(
      authUser.user,
      authUser.refreshTokenId,
    );
    this.setRefreshTokenCookie(res, tokens.refreshToken);
    return { accessToken: tokens.accessToken };
  }

  @Post('google-login')
  async googleLogin(
    @Body() credentialBody: { credential: string },
    @Res({ passthrough: true }) res: Response,
  ): Promise<AccessTokenResponse> {
    const userData = await this.googleService.getUserData(
      credentialBody.credential,
    );
    return await this.socialLogin(
      {
        ...userData,
        authType: AuthType.GOOGLE,
      },
      res,
    );
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
}

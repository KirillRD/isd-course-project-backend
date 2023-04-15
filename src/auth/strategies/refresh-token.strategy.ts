import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';
import { Exception } from 'src/exceptions';
import { IssuedRefreshTokenService } from 'src/issued-refresh-token/issued-refresh-token.service';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';
import { AuthUserData, JwtPayload } from 'src/auth/types';
import { REFRESH_TOKEN_COOKIE } from 'src/auth/constants';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly config: ConfigService,
    private readonly userService: UserService,
    private readonly issuedRefreshTokenService: IssuedRefreshTokenService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RefreshTokenStrategy.extract,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload): Promise<AuthUserData> {
    const user = await this.userService.findOneById(payload.sub);

    if (!user) {
      throw new UnauthorizedException(Exception.JWT_REFRESH_TOKEN_INVALID);
    } else if (user.isLock) {
      throw new ForbiddenException(Exception.USER_IS_LOCK);
    }

    const refreshToken = RefreshTokenStrategy.extract(req);
    const issuedRefreshTokens =
      await this.issuedRefreshTokenService.findAllByUserId(user.id);
    const issuedRefreshToken = issuedRefreshTokens.find(
      async (issuedRefreshToken) => {
        return await this.authService.verifyDataByHash(
          issuedRefreshToken.refreshToken,
          refreshToken,
        );
      },
    );

    if (!refreshToken || !issuedRefreshToken) {
      throw new UnauthorizedException(Exception.JWT_REFRESH_TOKEN_INVALID);
    }

    return {
      user,
      refreshTokenId: issuedRefreshToken.id,
    };
  }

  private static extract(req: Request): string | undefined {
    return req.signedCookies?.[REFRESH_TOKEN_COOKIE];
  }
}

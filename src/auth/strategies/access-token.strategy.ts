import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthUserData, JwtPayload } from 'src/auth/types';
import { Exception } from 'src/exceptions';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly config: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<AuthUserData> {
    const user = await this.userService.findOneById(payload.sub);

    if (!user) {
      throw new UnauthorizedException(Exception.JWT_ACCESS_TOKEN_INVALID);
    } else if (user.isLock) {
      throw new ForbiddenException(Exception.USER_IS_LOCK);
    }

    return { user };
  }
}

import { ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpRequestHeader } from 'http-enums';
import { createParamDecoratorWithInjections } from 'nestjs-create-param-decorator-with-injections';
import { JwtPayload } from 'src/auth/types';

export const AuthUserId = createParamDecoratorWithInjections(
  (
    data: unknown,
    ctx: ExecutionContext,
    { jwtService },
  ): number | undefined => {
    const request = ctx.switchToHttp().getRequest();
    const accessToken = request.headers[HttpRequestHeader.AUTHORIZATION];
    if (accessToken) {
      const payload: JwtPayload = jwtService.decode(
        accessToken.split(' ')[1],
      ) as JwtPayload;
      return payload.sub;
    }
  },
  { jwtService: JwtService },
);

import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { AuthUserData } from 'src/auth/types';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthUserData => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

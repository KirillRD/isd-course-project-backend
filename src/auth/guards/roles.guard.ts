import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_DECORATOR_NAME } from 'src/auth/constants';
import { AuthUserData } from 'src/auth/types';
import { Exception } from 'src/exceptions';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>(
      ROLES_DECORATOR_NAME,
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const authUser: AuthUserData = request?.user;

    if (
      !authUser ||
      !authUser.user.roles.some((role) => roles.includes(role))
    ) {
      throw new ForbiddenException(Exception.USER_ROLE_ACCESS_DENIED);
    }

    return true;
  }
}

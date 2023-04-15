import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, User } from '@prisma/client';
import { ROLES_DECORATOR_NAME } from 'src/auth/constants';
import { Exception } from 'src/exceptions';

export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>(
      ROLES_DECORATOR_NAME,
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const user: User = request?.user;

    if (!user || !user.roles.some((role) => roles.includes(role))) {
      throw new ForbiddenException(Exception.USER_ROLE_ACCESS_DENIED);
    }

    return true;
  }
}

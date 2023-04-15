import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';
import { ROLES_DECORATOR_NAME } from 'src/auth/constants';

export const Roles = (...roles: Role[]) =>
  SetMetadata(ROLES_DECORATOR_NAME, roles);

import { User } from '@prisma/client';

export type AuthUserData = {
  user: User;
  refreshTokenId?: number;
};

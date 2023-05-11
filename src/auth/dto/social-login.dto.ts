import { AuthType } from '@prisma/client';

export class SocialLoginDto {
  email: string;
  name: string;
  authType: AuthType;
}

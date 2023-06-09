import { AuthType } from '@prisma/client';

export class CreateUserDto {
  email: string;
  password?: string;
  name: string;
  authType?: AuthType;
}

import { CookieOptions } from 'express';
import ms from 'ms';

export const ROLES_DECORATOR_NAME = 'roles';
export const REFRESH_TOKEN_COOKIE = 'refresh-token';
export const REFRESH_TOKEN_PATH = '/refresh-token';
export const REFRESH_TOKEN_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: Boolean(process.env.IS_PROD),
  signed: true,
  path: `/auth${REFRESH_TOKEN_PATH}`,
  maxAge: ms(process.env.JWT_REFRESH_TOKEN_EXPIRATION),
};

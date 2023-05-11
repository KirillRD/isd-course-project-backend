import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { nestCsrf } from 'ncsrf';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';
import { HttpMethod } from 'http-enums';
import { PrismaService } from 'nestjs-prisma';

enum AllowedHeaders {
  ACCEPT = 'Accept',
  CONTENT_TYPE = 'Content-Type',
  AUTHORIZATION = 'Authorization',
  CSRF_TOKEN = 'csrf-token',
}

enum AllowedMethods {
  GET = HttpMethod.GET,
  POST = HttpMethod.POST,
  PUT = HttpMethod.PUT,
  PATCH = HttpMethod.PATCH,
  DELETE = HttpMethod.DELETE,
  OPTIONS = HttpMethod.OPTIONS,
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.use(json({ limit: process.env.REQUEST_LIMIT }));
  app.use(urlencoded({ limit: process.env.REQUEST_LIMIT, extended: true }));

  app.enableCors({
    credentials: true,
    origin: [process.env.FRONTEND_URL],
    allowedHeaders: Object.values(AllowedHeaders) as string[],
    methods: Object.values(AllowedMethods) as string[],
  });

  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(nestCsrf({ signed: true, sameSite: 'none' }));

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(process.env.PORT);
}
bootstrap();

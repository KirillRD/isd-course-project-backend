import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { nestCsrf } from 'ncsrf';
import cookieParser from 'cookie-parser';
import HTTPMethod from 'http-method-enum';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';

enum AllowedHeaders {
  ACCEPT = 'Accept',
  CONTENT_TYPE = 'Content-Type',
  AUTHORIZATION = 'Authorization',
  CSRF_TOKEN = 'csrf-token',
}

enum AllowedMethods {
  GET = HTTPMethod.GET,
  POST = HTTPMethod.POST,
  PUT = HTTPMethod.PUT,
  PATCH = HTTPMethod.PATCH,
  DELETE = HTTPMethod.DELETE,
  OPTIONS = HTTPMethod.OPTIONS,
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
  app.use(nestCsrf({ signed: true }));

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(process.env.PORT);
}
bootstrap();

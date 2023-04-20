import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { IssuedRefreshTokenModule } from './issued-refresh-token/issued-refresh-token.module';
import { ReviewModule } from './review/review.module';
import { CreationModule } from './creation/creation.module';
import { CreationCategoryModule } from './creation-category/creation-category.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    UserModule,
    IssuedRefreshTokenModule,
    ReviewModule,
    CreationModule,
    CreationCategoryModule,
    RoleModule,
  ],
})
export class AppModule {}

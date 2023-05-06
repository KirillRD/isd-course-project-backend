import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { IssuedRefreshTokenModule } from './issued-refresh-token/issued-refresh-token.module';
import { ReviewModule } from './review/review.module';
import { CreationModule } from './creation/creation.module';
import { TagModule } from './tag/tag.module';
import { ImageKitModule } from './image-kit/image-kit.module';
import { LikeModule } from './like/like.module';
import { CreationRatingModule } from './creation-rating/creation-rating.module';
import { JwtModule } from '@nestjs/jwt';
import { ReviewCommentModule } from './review-comment/review-comment.module';
import { PrismaModule } from 'nestjs-prisma';
import { AlgoliaModule } from 'src/algolia/algolia.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({ global: true }),
    PrismaModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    AlgoliaModule,
    AuthModule,
    UserModule,
    IssuedRefreshTokenModule,
    ReviewModule,
    CreationModule,
    TagModule,
    ImageKitModule,
    LikeModule,
    CreationRatingModule,
    ReviewCommentModule,
  ],
})
export class AppModule {}

import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'nestjs-prisma';
import { AlgoliaService } from 'src/algolia/algolia.service';

@Injectable()
export class AlgoliaSchedule {
  constructor(
    private readonly algoliaService: AlgoliaService,
    private readonly prisma: PrismaService,
  ) {}

  @Cron('0 0 * * *')
  async saveReviews() {
    const reviews = (await this.prisma.review.findMany()).map((review) => ({
      ...review,
      objectID: review.id,
    }));
    const reviewComments = (await this.prisma.reviewComment.findMany()).map(
      (reviewComment) => ({
        ...reviewComment,
        objectID: reviewComment.id,
      }),
    );
    const index = this.algoliaService.initReviewIndex();
    index.partialUpdateObjects(reviews, { createIfNotExists: true });
    index.partialUpdateObjects(reviewComments, { createIfNotExists: true });
  }
}

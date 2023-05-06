import { Module } from '@nestjs/common';
import { AlgoliaSchedule } from 'src/algolia/algolia.schedule';
import { AlgoliaService } from 'src/algolia/algolia.service';

@Module({
  providers: [AlgoliaService, AlgoliaSchedule],
  exports: [AlgoliaService],
})
export class AlgoliaModule {}

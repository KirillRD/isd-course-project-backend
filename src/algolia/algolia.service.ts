import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch';

@Injectable()
export class AlgoliaService {
  readonly algoliaClient: SearchClient;
  readonly REVIEW_INDEX = 'review';

  constructor(private readonly config: ConfigService) {
    this.algoliaClient = algoliasearch(
      config.get('ALGOLIA_APP_ID'),
      config.get('ALGOLIA_API_KEY'),
    );
  }

  initReviewIndex(): SearchIndex {
    return this.algoliaClient.initIndex(this.REVIEW_INDEX);
  }
}

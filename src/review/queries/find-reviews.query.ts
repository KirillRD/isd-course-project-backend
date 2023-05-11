import { CreationCategory } from '@prisma/client';

export const reviewOrderOptions = {
  'review-create-date-asc': [{ createDate: 'asc' }],
  'review-create-date-desc': [{ createDate: 'desc' }],
  'review-title-asc': [{ title: 'asc' }],
  'review-title-desc': [{ title: 'desc' }],
  'review-grade-asc': [{ grade: 'asc' }, { createDate: 'desc' }],
  'review-grade-desc': [{ grade: 'desc' }, { createDate: 'desc' }],
} as const;

export type ReviewOrderOptions = keyof typeof reviewOrderOptions;

export const ID_REGEX = /^[1-9]\d*$/;
export const DEFAULT_PAGE = 1;
export const DEFAULT_SIZE = 10;
export const DEFAULT_ORDER: ReviewOrderOptions = 'review-create-date-desc';

export class FindReviewsQuery {
  page: number;
  size: number;
  order: ReviewOrderOptions;
  reviewTitle?: string;
  creationId?: number;
  tagIds?: number[];
  creationCategories?: CreationCategory[];
}

export class CountReviewsQuery {
  reviewTitle?: string;
  creationId?: number;
  tagIds?: number[];
  creationCategories?: CreationCategory[];
}

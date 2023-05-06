import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import {
  DEFAULT_ORDER,
  ReviewOrderOptions,
  reviewOrderOptions,
} from 'src/review/queries/find-reviews.query';

@Injectable()
export class OrderPipe implements PipeTransform {
  transform(value: string[] | string | undefined, metadata: ArgumentMetadata) {
    if (
      value !== undefined &&
      !Array.isArray(value) &&
      Object.keys(reviewOrderOptions).includes(value)
    ) {
      return value as ReviewOrderOptions;
    }
    return DEFAULT_ORDER;
  }
}

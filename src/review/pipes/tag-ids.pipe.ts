import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ID_REGEX } from 'src/review/queries/find-reviews.query';

@Injectable()
export class TagIdsPipe implements PipeTransform {
  transform(value: string[] | string | undefined, metadata: ArgumentMetadata) {
    if (value !== undefined) {
      const tagIds = [value]
        .flat()
        .filter((tagId) => ID_REGEX.test(tagId))
        .map((tagId) => +tagId);
      if (tagIds.length) return tagIds;
    }
  }
}

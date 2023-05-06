import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { DEFAULT_SIZE, ID_REGEX } from 'src/review/queries/find-reviews.query';

@Injectable()
export class SizePipe implements PipeTransform {
  transform(value: string[] | string | undefined, metadata: ArgumentMetadata) {
    if (value !== undefined && !Array.isArray(value) && ID_REGEX.test(value)) {
      return +value;
    }
    return DEFAULT_SIZE;
  }
}

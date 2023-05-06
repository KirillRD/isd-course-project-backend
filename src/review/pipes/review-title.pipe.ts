import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ReviewTitlePipe implements PipeTransform {
  transform(value: string[] | string | undefined, metadata: ArgumentMetadata) {
    if (value !== undefined && !Array.isArray(value)) {
      return value;
    }
  }
}

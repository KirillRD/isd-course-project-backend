import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreationCategory } from '@prisma/client';

@Injectable()
export class CreationCategoriesPipe implements PipeTransform {
  transform(value: string[] | string | undefined, metadata: ArgumentMetadata) {
    if (value !== undefined) {
      const creationCategories = [value]
        .flat()
        .filter((creationCategory) =>
          Object.keys(CreationCategory).includes(
            creationCategory as CreationCategory,
          ),
        )
        .map(
          (creationCategory) =>
            CreationCategory[creationCategory] as CreationCategory,
        );
      if (creationCategories.length) return creationCategories;
    }
  }
}

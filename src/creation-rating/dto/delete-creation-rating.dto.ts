import { OmitType } from '@nestjs/mapped-types';
import { CreationRatingDto } from 'src/creation-rating/dto/creation-rating.dto';

export class DeleteCreationRatingDto extends OmitType(CreationRatingDto, [
  'rating',
] as const) {}

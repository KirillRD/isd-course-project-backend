import { CreationCategory, CreationRating } from '@prisma/client';
import { CreationSchema } from 'src/creation/schemas/creation-schema.schema';

export class CreationDto implements CreationSchema {
  id: number;
  title: string;
  description: string;
  imageId: string;
  imageUrl: string;
  category: CreationCategory;
  ratings?: CreationRating[];
  _count?: {
    reviews?: number;
  };
  averageRating?: number;
}

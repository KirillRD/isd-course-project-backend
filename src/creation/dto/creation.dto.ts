import { CreationCategory } from '@prisma/client';
import { CreationSchema } from 'src/creation/interfaces/creation-schema.interface';

export class CreationDto implements CreationSchema {
  id: number;
  title: string;
  description: string;
  category: CreationCategory;
  averageRating: number;
  userRating?: number;
}

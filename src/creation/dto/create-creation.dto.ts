import { CreationCategory } from '@prisma/client';

export class CreateCreationDto {
  title: string;
  description: string;
  category: CreationCategory;
}

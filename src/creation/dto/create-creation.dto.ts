import { CreationCategory } from '@prisma/client';

export class CreateCreationDto {
  title: string;
  category: CreationCategory;
}

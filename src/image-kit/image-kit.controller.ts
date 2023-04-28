import { Controller } from '@nestjs/common';
import { ImageKitService } from './image-kit.service';

@Controller('image-kit')
export class ImageKitController {
  constructor(private readonly imageKitService: ImageKitService) {}
}

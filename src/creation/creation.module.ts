import { Module } from '@nestjs/common';
import { CreationService } from './creation.service';
import { CreationController } from './creation.controller';
import { ImageKitModule } from 'src/image-kit/image-kit.module';

@Module({
  imports: [ImageKitModule],
  controllers: [CreationController],
  providers: [CreationService],
  exports: [CreationService],
})
export class CreationModule {}

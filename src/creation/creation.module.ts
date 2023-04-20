import { Module } from '@nestjs/common';
import { CreationService } from './creation.service';
import { CreationController } from './creation.controller';

@Module({
  controllers: [CreationController],
  providers: [CreationService]
})
export class CreationModule {}

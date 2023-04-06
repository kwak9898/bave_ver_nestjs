import { Module } from '@nestjs/common';
import { BeachService } from './beach.service';
import { BeachController } from './beach.controller';

@Module({
  providers: [BeachService],
  controllers: [BeachController]
})
export class BeachModule {}

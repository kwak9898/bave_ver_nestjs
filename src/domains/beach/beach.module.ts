import { Module } from '@nestjs/common';
import { BeachService } from './beach.service';
import { BeachController } from './beach.controller';
import { BeachRepository } from './beach.repository';

@Module({
  providers: [BeachService, BeachRepository],
  controllers: [BeachController],
  exports: [BeachService, BeachRepository],
})
export class BeachModule {}

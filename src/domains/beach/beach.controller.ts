import { Controller, Get, Param } from '@nestjs/common';
import { BeachService } from './beach.service';
import { Beach } from './entities/beach.entity';

@Controller('beach')
export class BeachController {
  constructor(private readonly beachService: BeachService) {}

  @Get('/:beachId')
  async findOneByBeachId(@Param('beachId') beachId: number): Promise<Beach> {
    return this.beachService.findOneByBeacnId(beachId);
  }
}

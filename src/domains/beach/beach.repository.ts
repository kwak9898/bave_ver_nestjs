import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Beach } from './entities/beach.entity';

@Injectable()
export class BeachRepository extends Repository<Beach> {
  constructor(private readonly dataSource: DataSource) {
    super(Beach, dataSource.createEntityManager());
  }
}

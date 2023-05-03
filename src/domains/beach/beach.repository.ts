import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Beach } from './entities/beach.entity';

@Injectable()
export class BeachRepository extends Repository<Beach> {
  constructor(private readonly dataSource: DataSource) {
    super(Beach, dataSource.createEntityManager());
  }

  /**
   * 해수욕장 고유값을 이용한 특정 해수욕장 조회
   * @param beachId
   * @returns
   */
  async findOneByBeacnId(beachId: number): Promise<Beach> {
    return this.findOne({ where: { beachId } });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { BeachRepository } from './beach.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { BEACH_EXCEPTION } from 'src/exception/errorCode';
import { Beach } from './entities/beach.entity';

@Injectable()
export class BeachService {
  constructor(
    @InjectRepository(BeachRepository)
    private readonly beachRepository: BeachRepository,
  ) {}

  /**
   * 해수욕장 고유값을 이용한 특정 해수욕장 조회
   * @param beachId
   * @returns
   */
  async findOneByBeacnId(beachId: number): Promise<Beach> {
    const beach = await this.beachRepository.findOneByBeacnId(beachId);

    if (!beach) {
      throw new NotFoundException(BEACH_EXCEPTION.BEACH_NOT_FOUND);
    }

    return beach;
  }
}

import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { BeachRepository } from '../../domains/beach/beach.repository';
import { Beach } from '../../domains/beach/entities/beach.entity';

@Injectable()
export class BeachFactory {
  constructor(private readonly beachRepository: BeachRepository) {}

  async createBeach(beach?: Beach): Promise<Beach> {
    beach = new Beach();
    beach.beachName = faker.name.middleName();
    beach.sidoName = faker.name.jobArea();
    beach.gugunName = faker.random.word();
    beach.latitude = faker.random.alpha();
    beach.longitude = faker.random.alpha();

    return await this.beachRepository.save(beach);
  }

  async createBaseBeach(): Promise<Beach> {
    const beach = new Beach();
    beach.beachName = faker.name.middleName();
    beach.sidoName = faker.name.jobArea();
    beach.gugunName = faker.random.word();
    beach.latitude = faker.random.alpha();
    beach.longitude = faker.random.alpha();

    const beachList = [];
    const saveBeach = await this.beachRepository.save(beach);

    for (let i = 0; i < 10; i++) {
      beachList.push(await this.createBeach(saveBeach));
    }

    return saveBeach;
  }
}

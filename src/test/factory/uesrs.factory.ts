import { Injectable } from '@nestjs/common';
import { Users } from 'src/domains/users/entities/users.entity';
import { UsersRepository } from 'src/domains/users/users.repository';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersFactory {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createTestUser(users?: Users) {
    users = new Users();
    users.email = faker.internet.email();
    users.username = faker.internet.userName();
    users.password = await bcrypt.hash('test123!@#', 12);
    return this.usersRepository.save(users);
  }
}

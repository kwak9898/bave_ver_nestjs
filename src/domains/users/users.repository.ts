import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/createuser.dto';

@Injectable()
export class UsersRepository extends Repository<Users> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {
    super(Users, dataSource.createEntityManager());
  }

  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const { email, password, username } = createUserDto;

    const createUser = this.create({
      email,
      password,
      username,
    });

    return createUser;
  }
}

import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersRepository extends Repository<Users> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {
    super(Users, dataSource.createEntityManager());
  }

  /**
   * 유저 생성
   * @param createUserDto
   * @returns
   */
  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const { email, password, username } = createUserDto;

    const createUser = this.create({
      email,
      password,
      username,
    });

    return createUser;
  }

  /**
   * 특정 유저 조회
   * @param userId
   * @returns
   */
  async findByUserId(userId: number): Promise<Users> {
    return await this.findOne({ where: { userId } });
  }
}

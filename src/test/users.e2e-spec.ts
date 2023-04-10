import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersRepository } from 'src/domains/users/users.repository';
import { AppModule } from 'src/app.module';
import { DataSource } from 'typeorm';
import { RequestHelper } from 'src/utils/test.utils';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/domains/users/dto/createUser.dto';

describe('계정 생성/조회/수정/삭제 테스트', () => {
  let app: INestApplication;

  //   let usersService: UsersService;
  //   let authService: AuthService;

  let requestHelper: RequestHelper;
  //   let authFactory: AuthFactory;
  //   let userFactory: UserFactory;
  let dataSource: DataSource;

  let userId: number | undefined;
  let username: string | undefined;
  let roleName: string | undefined;

  let token;
  let user;

  const UserDomain = '/users';
  const AuthDomain = '/auth';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        UsersRepository,
        DatabaseModule,
        JwtService,
        // AuthService,
        // UsersService,
        // AuthFactory,
        // UserFactory,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    // authService = moduleFixture.get(AuthService);
    // usersService = moduleFixture.get(UsersService);

    // authFactory = moduleFixture.get(AuthFactory);
    // userFactory = moduleFixture.get(UserFactory);

    dataSource = moduleFixture.get(DataSource);
    await dataSource.synchronize(true);

    // token = await authFactory.createTestToken();
    // user = await userFactory.createManagerUser();

    requestHelper = new RequestHelper(app, token);

    await app.init();
  });

  describe('계정 생성', () => {
    it('성공', async () => {
      // Given
      const createUserDto = new CreateUserDto();
      createUserDto.email = 'testuser@gmail.com';
      createUserDto.username = 'testuser';
      createUserDto.password = 'testuser123@';
      createUserDto.confirmPassword = 'testuser123@';

      // When
      const response = await requestHelper.post(
        `${AuthDomain}/sign-up`,
        createUserDto,
      );

      // Then
      const body = response.body;

      expect(response.statusCode).toBe(HttpStatus.CREATED);
      expect(body.email).toBe(createUserDto.email);
      expect(body.username).toBe(createUserDto.username);
    });

    it('confirmPassword가 없으면 실패', async () => {
      // Given
      const createUserDto = new CreateUserDto();
      createUserDto.email = 'testuser@gmail.com';
      createUserDto.username = 'testuser';
      createUserDto.password = 'testuser123@';

      // When
      const response = await requestHelper.post(
        `{AuthDomain}/sign-up`,
        createUserDto,
      );

      // Then
      const body = response.body;

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      expect(body.error).toBe('Bad Request');
    });
  });
  describe('계정 조회', () => {
    it('특정 계정 조회 성공', async () => {
      // Given
      userId = 1;

      // When
      const response = await requestHelper.get(`${UserDomain}/${userId}`);

      // Then
      const body = response.body;

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(body.userId).toBe(userId);
    });

    it('존재하지 않은 userId일 경우 특정 계정 조회 실패', async () => {
      // Given
      userId = null;

      // When
      const response = await requestHelper.get(`${UserDomain}/${userId}`);

      // Then
      const body = response.body;

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      expect(body.error).toBe('Bad Request');
    });
  });
});

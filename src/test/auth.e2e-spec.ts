import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { UsersRepository } from 'src/domains/users/users.repository';
import { AppModule } from 'src/app.module';
import { DataSource } from 'typeorm';
import { RequestHelper } from 'src/utils/test.utils';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/domains/users/dto/user.dto';
import { UsersFactory } from './factory/uesrs.factory';

describe('로그인/로그아웃/계정 비밀번호 변경 및 username 변경 테스트', () => {
  let app: INestApplication;

  //   let usersService: UsersService;
  //   let authService: AuthService;

  let requestHelper: RequestHelper;
  //   let authFactory: AuthFactory;
  let usersFactory: UsersFactory;
  let dataSource: DataSource;

  let userId: number | undefined;
  let username: string | undefined;
  let roleName: string | undefined;

  let token;
  let user;

  const AuthDomain = '/auth';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        UsersRepository,
        DatabaseModule,
        JwtService,
        UsersFactory,
        // AuthService,
        // UsersService,
        // AuthFactory,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    // authService = moduleFixture.get(AuthService);
    // usersService = moduleFixture.get(UsersService);

    // authFactory = moduleFixture.get(AuthFactory);
    usersFactory = moduleFixture.get(UsersFactory);

    dataSource = moduleFixture.get(DataSource);
    await dataSource.synchronize(true);

    // token = await authFactory.createTestToken();
    // user = await UsersFactory.createManagerUser();

    requestHelper = new RequestHelper(app, token);

    await app.init();
  });
  describe('로그인 테스트', () => {
    it('성공', async () => {
      // Given
      const email = 'testuser@gmail.com';
      const password = 'testpasswor123@';

      // When
      const response = await requestHelper.post(`${AuthDomain}/sign-in`);

      // Then
      const body = response.body;

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(body.accessToken).not.toBeNull();
      expect(body.represhToken).not.toBeNull();
    });

    it('비밀번호를 틀렸을 경우 실패', async () => {
      // Given
      const email = 'testuser@gmail.com';
      const password = 'wrongpassword1234@';

      // When
      const response = await requestHelper.post(`${AuthDomain}/sign-in`);

      // Then
      const body = response.body;

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('존재하지 않는 email로 로그인 시도할 경우 실패', async () => {
      // Given
      const email = 'wrongemail@gmail.com';
      const password = 'testpassword123@';

      // When
      const response = await requestHelper.post(`${AuthDomain}/sign-in`);

      // Then
      const body = response.body;

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('로그아웃 테스트', async () => {
    it('성공', async () => {
      // Given
      const testUser = await usersFactory.createTestUser();

      const dto = new UserDto();
      dto.email = testUser.email;
      dto.password = testUser.password;
      dto.refreshToken = testUser.jwtToken;

      // When
      const response = await requestHelper.post(`${AuthDomain}/sign-out`, dto);

      // Then
      const body = response.body;

      expect(response.statusCode).toBe(HttpStatus.OK);
    });

    it('refreshToken이 없을 경우 실패', async () => {
      // Given
      const testUser = await usersFactory.createTestUser();

      const dto = new UserDto();
      dto.email = testUser.email;
      dto.password = testUser.password;

      // When
      const response = await requestHelper.post(`${AuthDomain}/sign-out`, dto);

      // Then
      const body = response.body;

      expect(response.statusCode).toBe(HttpStatus.UNAUTHORIZED);
      expect(response.body.message).toBe('Unauthorized');
    });
  });
});

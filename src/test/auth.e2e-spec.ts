import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersRepository } from '../domains/users/users.repository';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { RequestHelper } from '../utils/test.utils';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../domains/users/dto/user.dto';
import { UsersFactory } from './factory/uesrs.factory';
import { ChangeUserDto } from '../domains/users/dto/changeUser.dto';
import { USER_EXCEPTION } from '../exception/errorCode';

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

  describe('비밀번호 변경', () => {
    it('성공', async () => {
      // Given
      const testUser = await usersFactory.createTestUser();
      const dto = new ChangeUserDto();

      userId = testUser.userId;
      dto.password = 'change12345@';

      // When
      const response = await requestHelper.patch(
        `${AuthDomain}/change-user/${userId}`,
        dto,
      );

      // Then
      const body = response.body;

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(body.userId).toBe(userId);
      expect(body.email).toBe(testUser.email);
      expect(body.username).toBe(testUser.username);
    });

    it('userId가 없을 경우 실패', async () => {
      // Given
      const dto = new ChangeUserDto();

      dto.password = 'failtest123@';
      userId = null;

      // When
      const response = await requestHelper.patch(
        `${AuthDomain}/change-user/${userId}`,
        dto,
      );

      // Then
      const body = response.body;

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      expect(body.code).toBe(USER_EXCEPTION.USER_NOT_FOUND.code);
      expect(body.message).toBe(USER_EXCEPTION.USER_NOT_FOUND.message);
    });
  });

  describe('username 수정', () => {
    it('성공', async () => {
      // Given
      const testUser = await usersFactory.createTestUser();
      const dto = new ChangeUserDto();

      dto.username = 'changeUsername';
      userId = testUser.userId;

      // When
      const response = await requestHelper.patch(
        `${AuthDomain}/change-user/${userId}`,
        dto,
      );

      // Then
      const body = response.body;

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      expect(body.code).toBe(USER_EXCEPTION.USER_NOT_FOUND.code);
      expect(body.message).toBe(USER_EXCEPTION.USER_NOT_FOUND.message);
    });

    it('userId가 없을 경우 실패', async () => {
      // Given
      const dto = new ChangeUserDto();

      dto.username = 'failChange';
      userId = null;

      // When
      const response = await requestHelper.patch(
        `${AuthDomain}/change-user/${userId}`,
        dto,
      );

      // Then
      const body = response.body;

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      expect(body.code).toBe(USER_EXCEPTION.USER_NOT_FOUND.code);
      expect(body.message).toBe(USER_EXCEPTION.USER_NOT_FOUND.message);
    });
  });
});

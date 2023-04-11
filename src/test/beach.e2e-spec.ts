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
import { ChangeUserDto } from 'src/domains/users/dto/changeUser.dto';
import { BEACH_EXCEPTION, USER_EXCEPTION } from 'src/exception/errorCode';
import { BeachFactory } from './factory/beach.factory';
import { BeachService } from 'src/domains/beach/beach.service';

describe('해수욕장 전체 조회/해수욕장 상세 조회 테스트', () => {
  let app: INestApplication;

  let beachService: BeachService;

  let requestHelper: RequestHelper;
  let beachFactory: BeachFactory;
  let usersFactory: UsersFactory;
  let dataSource: DataSource;

  let beachId: number | undefined;
  let beachname: string | undefined;

  let token;
  let beach;

  const beachDomain = '/beach';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        UsersRepository,
        DatabaseModule,
        JwtService,
        UsersFactory,
        BeachService,
        BeachFactory,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    beachService = moduleFixture.get(BeachService);

    beachFactory = moduleFixture.get(BeachFactory);

    dataSource = moduleFixture.get(DataSource);
    await dataSource.synchronize(true);

    beach = await beachFactory.createBeach();
    requestHelper = new RequestHelper(app, token);

    await app.init();
  });

  describe('해수욕장 전체 조회 테스트', () => {
    it('성공', async () => {
      // Given
      await beachFactory.createBaseBeach();

      // When
      const response = await requestHelper.get(
        `${beachDomain}?page=1&limit=10`,
      );

      // Then
      const items = response.body.items[0];
      const meta = response.body.meta;

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(items).not.toBeNull();
      expect(meta.totalPages).toBe(1);
      expect(meta.itemsPerPage).toBe(10);
    });
  });

  describe('해수욕장 상세 조회 테스트', () => {
    it('성공', async () => {
      // Given
      beachId = beach.beachId;

      // When
      const response = await requestHelper.get(`${beachDomain}/${beachId}`);

      // Then
      const body = response.body;

      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(body.beachId).toBe(beachId);
    });

    it('beachId가 없을 경우 실패', async () => {
      // Given
      beachId = null;

      // When
      const response = await requestHelper.get(`${beachDomain}/${beachId}`);

      // Then
      const body = response.body;

      expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(body.code).toBe(BEACH_EXCEPTION.BEACH_NOT_FOUND.code);
      expect(body.message).toBe(BEACH_EXCEPTION.BEACH_NOT_FOUND.message);
    });
  });
});

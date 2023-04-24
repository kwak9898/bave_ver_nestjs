import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersRepository } from '../domains/users/users.repository';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { RequestHelper } from '../utils/test.utils';
import { JwtService } from '@nestjs/jwt';
import { UsersFactory } from './factory/uesrs.factory';
import { BookmarkService } from '../domains/bookmark/bookmark.service';
import { UsersService } from '../domains/users/users.service';
import { AuthService } from '../domains/auth/auth.service';
import { BookmarkFactory } from './factory/bookmark.factory';

describe('해수욕장 전체 조회/해수욕장 상세 조회 테스트', () => {
  let app: INestApplication;

  let bookmarkService: BookmarkService;
  let usersService: UsersService;
  let authService: AuthService;

  let requestHelper: RequestHelper;
  let bookmarkFactory: BookmarkFactory;
  // let authFactory: AuthFactory;

  let dataSource: DataSource;

  let bookmarkId: number | undefined;

  let token;
  let bookmark;
  let users;

  const beachDomain = '/beach';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        UsersRepository,
        DatabaseModule,
        JwtService,
        UsersFactory,
        // BookmarkFactory,
        BookmarkFactory,
        // AuthFactory,
        BookmarkService,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    bookmarkService = moduleFixture.get(BookmarkService);

    bookmarkFactory = moduleFixture.get(BookmarkFactory);

    dataSource = moduleFixture.get(DataSource);
    await dataSource.synchronize(true);

    bookmark = await bookmarkFactory.createBaseBookmark();
    requestHelper = new RequestHelper(app, token);

    await app.init();
  });
});

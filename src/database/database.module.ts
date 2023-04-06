import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beach } from 'src/domains/beach/entities/beach.entity';
import { Bookmark } from 'src/domains/bookmark/entities/bookmark.entity';
import { Feed } from 'src/domains/feed/entities/feed.entity';
import { Like } from 'src/domains/like/entities/like.entity';
import { Reply } from 'src/domains/reply/entities/reply.entity';
import { Users } from 'src/domains/users/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Beach, Bookmark, Feed, Like, Reply, Users],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}

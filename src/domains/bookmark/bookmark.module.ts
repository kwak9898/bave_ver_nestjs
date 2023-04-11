import { Module } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkController } from './bookmark.controller';
import { bookmarkRepository } from './boockmark.repository';

@Module({
  providers: [BookmarkService, bookmarkRepository],
  controllers: [BookmarkController],
  exports: [BookmarkService, bookmarkRepository],
})
export class BookmarkModule {}

import { Injectable } from '@nestjs/common';
import { bookmarkRepository } from 'src/domains/bookmark/boockmark.repository';
import { Bookmark } from 'src/domains/bookmark/entities/bookmark.entity';

@Injectable()
export class BookmarkFactory {
  constructor(private readonly bookmarkRepository: bookmarkRepository) {}

  async createBaseBookmark(bookmark?: Bookmark): Promise<Bookmark> {
    return await this.bookmarkRepository.save(bookmark);
  }
}

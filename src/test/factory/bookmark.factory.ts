import { Injectable } from '@nestjs/common';
import { bookmarkRepository } from '../../domains/bookmark/boockmark.repository';
import { Bookmark } from '../../domains/bookmark/entities/bookmark.entity';

@Injectable()
export class BookmarkFactory {
  constructor(private readonly bookmarkRepository: bookmarkRepository) {}

  async createBaseBookmark(bookmark?: Bookmark): Promise<Bookmark> {
    return await this.bookmarkRepository.save(bookmark);
  }
}

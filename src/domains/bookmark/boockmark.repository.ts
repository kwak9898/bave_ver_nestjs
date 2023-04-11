import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Bookmark } from './entities/bookmark.entity';

@Injectable()
export class bookmarkRepository extends Repository<Bookmark> {
  constructor(private readonly dataSource: DataSource) {
    super(Bookmark, dataSource.createEntityManager());
  }
}

import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { Users } from '../../users/entities/users.entity';
import { Feed } from '../../feed/entities/feed.entity';
import { Reply } from '../../reply/entities/reply.entity';
import { Beach } from '../../beach/entities/beach.entity';

@Entity('bookmark')
export class Bookmark extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'bookmark_id',
    comment: '북마크 ID',
  })
  bookmarkId: number;

  @ManyToOne(() => Users, (user) => user.bookmarkList)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  userId: number;

  @ManyToOne(() => Feed, (feed) => feed.bookmarkList)
  @JoinColumn({ name: 'feed_id', referencedColumnName: 'feedId' })
  feedId: number;

  @ManyToOne(() => Beach, (beach) => beach.bookmarkList)
  @JoinColumn({ name: 'beach_id', referencedColumnName: 'beachId' })
  beachId: number;
}

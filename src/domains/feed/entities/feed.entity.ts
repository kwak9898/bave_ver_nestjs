import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { Users } from '../../users/entities/users.entity';
import { Reply } from '../../reply/entities/reply.entity';
import { Bookmark } from '../../bookmark/entities/bookmark.entity';
import { Beach } from '../../beach/entities/beach.entity';
import { Like } from '../../like/entities/like.entity';

@Entity()
export class Feed extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'feed_id',
    comment: '피드 ID',
  })
  feedId: number;

  @Column('character varying', {
    name: 'content',
    comment: '피드 글',
    nullable: false,
  })
  content: string;

  @Column('character varying', {
    name: 'feed_image',
    comment: 'feed image',
    nullable: true,
  })
  image!: string[] | null;

  @ManyToOne(() => Users, (user) => user.feedList)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  userId: number;

  @ManyToOne(() => Beach, (beach) => beach.feedList)
  @JoinColumn({ name: 'beach_id', referencedColumnName: 'beachId' })
  beachId: number;

  @OneToMany(() => Reply, (reply) => reply.feedId)
  @JoinColumn({ name: 'reply_id', referencedColumnName: 'replyId' })
  replyList: Reply[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.feedId)
  @JoinColumn({ name: 'bookmark_id', referencedColumnName: 'bookmarkId' })
  bookmarkList: Bookmark[];

  @OneToMany(() => Like, (like) => like.feedId)
  @JoinColumn({ name: 'like_id', referencedColumnName: 'likeId' })
  likeId: number;
}

import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { Feed } from '../../feed/entities/feed.entity';
import { Bookmark } from '../../bookmark/entities/bookmark.entity';
import { Like } from '../../like/entities/like.entity';

@Entity('beach', { schema: 'public' })
export class Beach extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'beach_id',
    comment: '해수욕장 ID',
  })
  beachId: number;

  @Column('character varying', {
    name: 'sido_name',
    comment: '시 이름',
    nullable: false,
  })
  sidoName: string;

  @Column('character varying', {
    name: 'gugun_name',
    comment: '구/군 이름',
    nullable: false,
  })
  gugunName: string;

  @Column('character varying', {
    name: 'beach_name',
    comment: '해수욕장 이름',
    nullable: false,
  })
  beachName: string;

  @Column('character varying', {
    name: 'latitude',
    comment: '위도',
    nullable: false,
  })
  latitude: string;

  @Column('character varying', {
    name: 'longitude',
    comment: '경도',
    nullable: false,
  })
  longitude: string;

  @OneToMany(() => Feed, (feed) => feed.beachId)
  @JoinColumn({ name: 'feed_id', referencedColumnName: 'feedId' })
  feedList: Feed[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.beachId)
  @JoinColumn({ name: 'bookmark_id', referencedColumnName: 'bookmarkId' })
  bookmarkList: Bookmark[];

  @OneToMany(() => Like, (like) => like.beachId)
  @JoinColumn({ name: 'like_id', referencedColumnName: 'likeId' })
  likeId: number;
}

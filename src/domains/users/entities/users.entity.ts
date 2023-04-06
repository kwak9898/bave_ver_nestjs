import { BaseEntity } from 'src/domains/base/base.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Bookmark } from '../../bookmark/entities/bookmark.entity';
import { Feed } from '../../feed/entities/feed.entity';
import { Like } from '../../like/entities/like.entity';
import { Reply } from '../../reply/entities/reply.entity';

@Entity('users', { schema: 'public' })
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'user_id',
    comment: '회원 아이디',
  })
  userId: number;

  @Column('character varying', {
    name: 'email',
    comment: '회원 이메일',
    nullable: false,
    unique: true,
  })
  email: string;

  @Column('character varying', {
    name: 'password',
    comment: '패스워드',
    nullable: false,
    select: false,
  })
  password: string;

  @Column('character varying', {
    name: 'username',
    comment: '회원 사용 이름',
    nullable: false,
  })
  username: string;

  @Column('character varying', {
    name: 'jwt_token',
    comment: 'jwt refresh token',
    nullable: true,
    select: false,
  })
  jwtToken!: string | null;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.userId)
  @JoinColumn({ name: 'bookmark_id', referencedColumnName: 'bookmarkId' })
  bookmarkList: Bookmark[];

  @OneToMany(() => Like, (like) => like.userId)
  @JoinColumn({ name: 'like_id', referencedColumnName: 'likeId' })
  likeId: number;

  @OneToMany(() => Reply, (reply) => reply.userId)
  @JoinColumn({ name: 'reply_id', referencedColumnName: 'replyId' })
  replyList: Reply[];

  @OneToMany(() => Feed, (feed) => feed.userId)
  feedList: Feed[];

  async hashPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 12);
  }

  @BeforeUpdate()
  async updateDate(): Promise<void> {
    this.updatedAt = await new Date();
  }
}

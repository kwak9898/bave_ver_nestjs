import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../base/base.entity';
import { Users } from '../../users/entities/users.entity';
import { Feed } from '../../feed/entities/feed.entity';
import { Reply } from '../../reply/entities/reply.entity';
import { Beach } from '../../beach/entities/beach.entity';

@Entity('like', { schema: 'public' })
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn({
    name: 'like_id',
    comment: '좋아요 ID',
  })
  likeId: number;

  @ManyToOne(() => Users, (user) => user.likeId)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  userId: number;

  @ManyToOne(() => Feed, (feed) => feed.likeId)
  @JoinColumn({ name: 'feed_id', referencedColumnName: 'feedId' })
  feedId: number;

  @ManyToOne(() => Reply, (reply) => reply.likeId)
  @JoinColumn({ name: 'reply_id', referencedColumnName: 'replyId' })
  replyId: number;

  @ManyToOne(() => Beach, (beach) => beach.likeId)
  @JoinColumn({ name: 'beach_id', referencedColumnName: 'beachId' })
  beachId: number;
}

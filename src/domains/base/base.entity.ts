import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @CreateDateColumn({
    name: 'created_at',
    comment: '생성일',
    type: 'timestamp',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: '수정일',
    type: 'timestamp',
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    comment: '삭제일',
    nullable: true,
    type: 'timestamp',
  })
  deletedAt?: Date;
}

import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';

@Module({
  providers: [ReplyService],
  controllers: [ReplyController]
})
export class ReplyModule {}

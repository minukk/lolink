import { Module } from '@nestjs/common';
import { HashtagController } from './hashtag.controller';
import { HashtagService } from './hashtag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hashtag } from './hashtag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Hashtag])],
  controllers: [HashtagController],
  providers: [HashtagService],
})
export class HashtagModule {}

import { Logger, Module } from '@nestjs/common';
import { RecommendService } from './recommend.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recommend } from './recommend.entity';
import { Post } from '../post/post.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Recommend, Post]), JwtModule],
  controllers: [],
  providers: [RecommendService, Logger],
  exports: [RecommendService],
})
export class RecommendModule {}

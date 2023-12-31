import { Logger, Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { UserModule } from '../user/user.module';
import { HashtagModule } from '../hashtag/hashtag.module';
import { RecommendModule } from '../recommend/recommend.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    UserModule,
    HashtagModule,
    RecommendModule,
    JwtModule,
  ],
  controllers: [PostController],
  providers: [PostService, Logger],
  exports: [PostService],
})
export class PostModule {}

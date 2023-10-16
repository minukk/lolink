import { Logger, Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { UserModule } from 'src/user/user.module';
import { PostModule } from 'src/post/post.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    UserModule,
    PostModule,
    JwtModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, Logger],
})
export class CommentModule {}

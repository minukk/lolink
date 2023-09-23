import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { UserService } from 'src/user/user.service';
import { PostService } from 'src/post/post.service';
// import { v4 as uuid } from 'uuid';
// import { bufferToUuid, uuidToBuffer } from 'util/transUUID';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private userService: UserService,
    private postService: PostService,
  ) {}

  async create(_comment) {
    const user = await this.userService.getUser(_comment.email);

    const comment = {
      userId: user.id,
      postId: _comment.postId,
      content: _comment.content,
    };

    return this.commentRepository.save(comment);
  }

  async getComments(postId) {
    const comments = await this.commentRepository.find({ where: { postId } });

    return comments;
  }

  async deletePost(id) {
    // 실제 프로덕트에서는 일부 정보를 지우고 데이터 일부는 남겨둠.
    // 글 or 중고 거래 목록은 화면에 보이지 않게 처리하고 데이터는 데이터베이스에 남겨둠.
    return this.commentRepository.delete({ id });
  }
}

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

  async paginate(_postId, page: number) {
    const take = 10;

    const [comments, total] = await this.commentRepository.findAndCount({
      where: { postId: _postId, show: true },
      order: {
        createdAt: 'DESC',
      },
      take,
      skip: (page - 1) * take,
    });

    return {
      data: comments,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }

  async create(_comment) {
    const user = await this.userService.getUserEmail(_comment.email);

    const comment = {
      userId: user.id,
      postId: _comment.postId,
      content: _comment.content,
    };

    return this.commentRepository.save(comment);
  }

  async getComment(id) {
    const comment = await this.commentRepository.findOne({ where: { id } });

    return comment;
  }

  async getComments(postId) {
    console.log('postId::::::', postId);
    const comments = await this.commentRepository.find({
      where: { postId, show: true },
    });

    // console.log(comments);

    return comments;
  }

  async deleteComment(id) {
    const comment = await this.getComment(id);

    comment.show = false;
    // 실제 프로덕트에서는 일부 정보를 지우고 데이터 일부는 남겨둠.
    // 글 or 중고 거래 목록은 화면에 보이지 않게 처리하고 데이터는 데이터베이스에 남겨둠.
    return this.commentRepository.save(comment);
  }
}

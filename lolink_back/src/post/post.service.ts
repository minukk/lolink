import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { UserService } from 'src/user/user.service';
// import { v4 as uuid } from 'uuid';
// import { uuidToBuffer } from 'util/transUUID';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private userService: UserService,
  ) {}

  async paginate(page: number = 1) {
    const take = 10;

    const [posts, total] = await this.postRepository.findAndCount({
      take,
      skip: (page - 1) * take,
    });

    return {
      data: posts,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }

  async create(_post) {
    const user = await this.userService.getUser(_post.email);

    const post = {
      // id: uuidToBuffer(uuid()),
      userId: user.id,
      title: _post.title,
      body: _post.body,
    };

    return this.postRepository.save(post);
  }

  async getPosts() {
    return await this.postRepository.find();
  }

  async getPost(id) {
    const result = await this.postRepository.findOne({
      where: { id },
    });
    return result;
  }

  async updatePost(id, _post) {
    const post: Post = await this.getPost(id);

    post.title = _post.title;
    post.body = _post.body;
    post.hash = _post.hash;
    post.imageUrls = _post.imageUrls;

    this.postRepository.save(post);
  }

  async deletePost(id) {
    // 실제 프로덕트에서는 일부 정보를 지우고 데이터 일부는 남겨둠.
    // 글 or 중고 거래 목록은 화면에 보이지 않게 처리하고 데이터는 데이터베이스에 남겨둠.
    return this.postRepository.delete({ id });
  }
}

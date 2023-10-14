import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private userService: UserService,
  ) {}

  async paginate(page: number) {
    const take = 10;
    console.log(page);
    const [posts, total] = await this.postRepository.findAndCount({
      where: { show: true },
      order: {
        createdAt: 'DESC',
      },
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
    const user = await this.userService.getUserEmail(_post.email);

    // if (_post.userId !== user.id) {
    //   throw new BadRequestException();
    //   return '글등록 실패';
    // }

    const post = {
      userId: user.id,
      nickname: user.nickname,
      title: _post.title,
      body: _post.body,
      category: _post.category,
      imageUrls: _post.imageUrls,
    };

    return this.postRepository.save(post);
  }

  async getPosts() {
    return await this.postRepository.find({ where: { show: true } });
  }

  async getPost(id) {
    const result = await this.postRepository.findOne({
      where: { id },
    });
    return result;
  }

  async updatePost(id, _post) {
    const post: Post = await this.getPost(id);

    console.log(post);
    console.log(_post);

    post.title = _post.title;
    post.body = _post.body;
    post.imageUrls = _post.imageUrls;

    this.postRepository.save(post);
  }

  async deletePost(id) {
    const post = await this.getPost(id);

    // 해시태그 삭제.

    post.show = false;

    // 실제 프로덕트에서는 일부 정보를 지우고 데이터 일부는 남겨둠.
    // 글 or 중고 거래 목록은 화면에 보이지 않게 처리하고 데이터는 데이터베이스에 남겨둠.
    return this.postRepository.save(post);
  }
}

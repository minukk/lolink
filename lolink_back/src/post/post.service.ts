import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { UserService } from 'src/user/user.service';
import { HashtagService } from 'src/hashtag/hashtag.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private userService: UserService,
    private hashtagService: HashtagService,
  ) {}

  async paginate(page: number) {
    const take = 20;
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
    const hashtags = await this.hashtagService.createHashtag(_post.hashtags);
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
      hashtags: hashtags,
    };

    const result = await this.postRepository.save(post);

    console.log(result);

    return result;
  }

  async getPosts() {
    return await this.postRepository.find({ where: { show: true } });
  }

  async incrementViewCount(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });

    post.views += 1;
    await this.postRepository.save(post);
  }

  async getPost(id: number) {
    const result = await this.postRepository.findOne({
      where: { id },
      relations: ['hashtags'],
    });

    return result;
  }

  // async getPostAndHashtag(id) {
  //   const result = await this.postRepository.findOne({
  //     where: { id },
  //   });
  //   const hashtags = await this.hashtagService.getPostHashtag(id);

  //   return {
  //     result,
  //     hashtags,
  //   };
  // }

  async updatePost(id, _post) {
    const post: Post = await this.getPost(id);
    const hashtags = await this.hashtagService.createHashtag(_post.hashtags);

    post.title = _post.title;
    post.body = _post.body;
    post.hashtags = hashtags;

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

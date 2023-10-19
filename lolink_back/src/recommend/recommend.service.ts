import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recommend } from './recommend.entity';
import { Repository } from 'typeorm';
import { Post } from '../post/post.entity';

@Injectable()
export class RecommendService {
  constructor(
    @InjectRepository(Recommend)
    private recommendRepository: Repository<Recommend>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async recommend(userId: string, postId: number): Promise<void> {
    const existingRecommendation = await this.recommendRepository.findOne({
      where: {
        user: { id: userId },
        post: { id: postId },
      },
    });

    if (existingRecommendation) {
      throw new BadRequestException('이미 추천하였습니다.');
    }

    await this.recommendRepository.save({
      user: { id: userId },
      post: { id: postId },
      type: 'recommend',
    });

    const post = await this.postRepository.findOne({ where: { id: postId } });
    post.recommendCount += 1;
    await this.postRepository.save(post);
  }

  async notRecommend(userId: string, postId: number): Promise<void> {
    const existingRecommendation = await this.recommendRepository.findOne({
      where: {
        user: { id: userId },
        post: { id: postId },
      },
    });

    if (existingRecommendation) {
      throw new BadRequestException('이미 비추천하였습니다.');
    }

    await this.recommendRepository.save({
      user: { id: userId },
      post: { id: postId },
      type: 'not_recommend',
    });

    const post = await this.postRepository.findOne({ where: { id: postId } });
    post.recommendCount -= 1;
    await this.postRepository.save(post);
  }
}

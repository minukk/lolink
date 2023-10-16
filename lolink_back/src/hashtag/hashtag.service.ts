import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hashtag } from './hashtag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag) private hashtagRepository: Repository<Hashtag>,
  ) {}

  // async createPostHashtag(hashtagId: number, postId: number) {
  //   const postHashtag = {
  //     postId,
  //     hashtagId,
  //   };

  //   await this.postHashtagRepository.save(postHashtag);
  // }

  async createHashtag(tags: string[]): Promise<any> {
    const createdHashtags = [];

    // 모든 해시태그에 대해 동시에 처리
    await Promise.all(
      tags.map(async (tag) => {
        let hashtag = await this.hashtagRepository.findOne({
          where: { tag },
        });

        if (!hashtag) {
          hashtag = this.hashtagRepository.create({ tag });
          await this.hashtagRepository.save(hashtag);
        }

        createdHashtags.push(hashtag);
      }),
    );

    return createdHashtags;
  }

  // async getPostHashtag(postId) {
  //   const postHashtags = await this.postHashtagRepository.find({
  //     where: { postId: postId },
  //   });

  //   const hashtagIds = postHashtags.map((ph) => ph.hashtagId);

  //   const hashtags = await this.hashtagRepository.find({
  //     where: { id: In(hashtagIds) }, // TypeORM의 In 연산자를 사용하여 여러 ID에 대한 조회를 수행
  //   });

  //   return hashtags;
  // }

  async findHashtags(query: string): Promise<Hashtag[]> {
    return this.hashtagRepository
      .createQueryBuilder('hashtag')
      .where('hashtag.tag LIKE :query', { query: `%${query}%` })
      .getMany();
  }
}

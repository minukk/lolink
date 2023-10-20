import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hashtag } from './hashtag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag) private hashtagRepository: Repository<Hashtag>,
  ) {}

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

  async findHashtags(query: string): Promise<Hashtag[]> {
    return this.hashtagRepository
      .createQueryBuilder('hashtag')
      .where('hashtag.tag LIKE :query', { query: `%${query}%` })
      .getMany();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hashtag } from './hashtag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag) private hashtagRepository: Repository<Hashtag>,
  ) {}

  async createHashtag(tag: string): Promise<Hashtag> {
    let hashtag = await this.hashtagRepository.findOne({
      where: { tag },
    });

    if (!hashtag) {
      hashtag = this.hashtagRepository.create({ tag });
      await this.hashtagRepository.save(hashtag);
    }

    return hashtag;
  }

  async findHashtags(query: string): Promise<Hashtag[]> {
    return this.hashtagRepository
      .createQueryBuilder('hashtag')
      .where('hashtag.tag LIKE :query', { query: `%${query}%` })
      .getMany();
  }
}

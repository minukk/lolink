import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recommend } from './recommend.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecommendService {
  constructor(
    @InjectRepository(Recommend)
    private recommendRepository: Repository<Recommend>,
  ) {}

  async getRecommned() {}

  async createRecommend() {}

  async updateRecommned() {}

  async deleteRecommned() {}
}

import { Controller } from '@nestjs/common';
import { RecommendService } from './recommend.service';

@Controller('recommend')
export class RecommendController {
  constructor(private recommendService: RecommendService) {}

  async getRecommend() {}

  createRecommend() {}

  async updateRecommned() {}

  async deleteRecommned() {}
}

import { Logger, Module } from '@nestjs/common';
import { RecommendController } from './recommend.controller';
import { RecommendService } from './recommend.service';

@Module({
  controllers: [RecommendController],
  providers: [RecommendService, Logger],
})
export class RecommendModule {}

import { Logger, Module } from '@nestjs/common';
import { RecommendController } from './recommend.controller';
import { RecommendService } from './recommend.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recommend } from './recommend.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recommend])],
  controllers: [RecommendController],
  providers: [RecommendService, Logger],
})
export class RecommendModule {}

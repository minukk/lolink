import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../post/post.entity';
import { Product } from '../product/product.entity';
import { Hashtag } from '../hashtag/hashtag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Product, Hashtag])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hashtag } from '../hashtag/hashtag.entity';
import { Post } from '../post/post.entity';
import { Product } from '../product/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) {}

  // 검색 로직
  async search(query: string) {
    const searchPosts = this.postRepository
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.hashtags', 'hashtag')
      .where('posts.title LIKE :query OR posts.body LIKE :query', {
        query: `%${query}%`,
      })
      .orWhere('hashtag.tag LIKE :query', {
        query: `%${query}%`,
      })
      .getMany();

    const searchProducts = this.productRepository
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.hashtags', 'hashtag')
      .where('products.title LIKE :query OR products.body LIKE :query', {
        query: `%${query}%`,
      })
      .orWhere('hashtag.tag LIKE :query', {
        query: `%${query}%`,
      })
      .getMany();

    const [posts, products] = await Promise.all([searchPosts, searchProducts]);

    return { posts, products };
  }
}

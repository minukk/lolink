import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { Product } from '../product/product.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like) private likeRepository: Repository<Like>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async getLikes(userId: string): Promise<Like[]> {
    const likes = await this.likeRepository.find({
      where: { user: { id: userId }, type: 'like' },
    });

    return likes;
  }

  async getLikesProduct(productId: string): Promise<Like[]> {
    const likes = await this.likeRepository.find({
      where: { user: { id: productId }, type: 'like' },
    });

    return likes;
  }

  async like(userId: string, productId: string): Promise<void> {
    const existingLike = await this.likeRepository.findOne({
      where: {
        user: { id: userId },
        product: { id: productId },
      },
    });

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (existingLike && existingLike.type === 'like') {
      throw new Error('이미 좋아요를 눌렀습니다.');
      return;
    }

    if (existingLike && existingLike.type === 'unlike') {
      existingLike.type = 'like';
      product.like += 1;
      await this.likeRepository.save(existingLike);
      await this.productRepository.save(product);
      return;
    }

    await this.likeRepository.save({
      user: { id: userId },
      product: { id: productId },
      type: 'like',
    });

    product.like += 1;
    await this.productRepository.save(product);
  }

  async unlike(userId: string, productId: string): Promise<void> {
    const existingLike = await this.likeRepository.findOne({
      where: {
        user: { id: userId },
        product: { id: productId },
      },
    });

    if (!existingLike) {
      throw new Error('좋아요를 누르지 않았습니다.');
    }

    if (existingLike.type === 'unlike') {
      throw new Error('이미 좋아요를 취소하였습니다.');
    }

    existingLike.type = 'unlike';

    await this.likeRepository.save(existingLike);

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (product.like < 1) {
      product.like = 0;
    } else {
      product.like -= 1;
    }

    await this.productRepository.save(product);
  }
}

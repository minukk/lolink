import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { Product } from '../product/product.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Product]), JwtModule],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule {}

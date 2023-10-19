import { Logger, Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { UserModule } from '../user/user.module';
import { HashtagModule } from '../hashtag/hashtag.module';
import { JwtModule } from '@nestjs/jwt';
import { LikeModule } from '../like/like.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    UserModule,
    HashtagModule,
    LikeModule,
    JwtModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, Logger],
  exports: [ProductService],
})
export class ProductModule {}

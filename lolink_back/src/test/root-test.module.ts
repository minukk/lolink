import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { Like } from '../like/like.entity';
import { Product } from '../product/product.entity';
import { LikeService } from '../like/like.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Like, Product])],
  providers: [UserService, LikeService],
  controllers: [UserController],
})
export class RootTestModule {}

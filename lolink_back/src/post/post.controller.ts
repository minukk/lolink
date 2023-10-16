import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { RecommendService } from 'src/recommend/recommend.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('post')
export class PostController {
  constructor(
    private postService: PostService,
    private recommendService: RecommendService,
  ) {}

  @Get('/')
  async getPosts(@Query('page') page: number) {
    return await this.postService.paginate(page);
  }

  @Get('/:id')
  async getPostAndHashtag(@Param() id: any) {
    return await this.postService.getPost(id?.id);
  }

  @Post('/write')
  @UseGuards(JwtAuthGuard)
  createPost(@Body() post: CreatePostDto) {
    // console.log(post);
    return this.postService.create(post);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updatePost(@Param() id: any, @Body() post: UpdatePostDto) {
    // console.log(id?.id, post);
    return this.postService.updatePost(id?.id, post);
  }

  @Post('/delete/:id')
  @UseGuards(JwtAuthGuard)
  async deletePost(@Param() id: string) {
    return this.postService.deletePost(id);
  }

  @Post(':id/recommend')
  @UseGuards(JwtAuthGuard)
  recommend(@Body() body, @Param('id') postId: number) {
    return this.recommendService.recommend(body.userId, postId);
  }

  @Post(':id/not-recommend')
  @UseGuards(JwtAuthGuard)
  notRecommend(@Body() body, @Param('id') postId: number) {
    return this.recommendService.notRecommend(body.userId, postId);
  }
}

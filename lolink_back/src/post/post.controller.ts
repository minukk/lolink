import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { RecommendService } from '../recommend/recommend.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
  async getPostAndHashtag(@Param('id') id: number, @Req() req, @Res() res) {
    const cookieName = `viewed_post_${id}`;
    console.log(req.cookies[cookieName]);
    if (!req.cookies[cookieName]) {
      await this.postService.incrementViewCount(id);
      res.cookie(cookieName, 'true', {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
      }); // 24시간 동안 유효한 쿠키 설정
    }
    const post = await this.postService.getPost(id);
    res.json(post);
  }

  @Post('/write')
  @UseGuards(JwtAuthGuard)
  createPost(@Body() post: CreatePostDto) {
    return this.postService.create(post);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postService.updatePost(id, post);
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

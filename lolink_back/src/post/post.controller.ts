import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/')
  async getPosts(@Query('page') page: number = 1) {
    return await this.postService.paginate(page);
  }

  @Get('/:id')
  async getPost(@Param() id: string) {
    const post = await this.getPost(id);
    return post;
  }

  @Post('/write')
  async createPost(@Body() post: CreatePostDto) {
    return this.postService.create(post);
  }

  @Patch('/:id')
  async updatePost(@Param() id: string, @Body() post: any) {
    return this.postService.updatePost(id, post);
  }

  @Post('/delete/:id')
  async deletePost(@Param() id: string) {
    return this.postService.deletePost(id);
  }
}

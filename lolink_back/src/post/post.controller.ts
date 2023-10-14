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
import { AuthGuard } from '@nestjs/passport';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/')
  async getPosts(@Query('page') page: number) {
    return await this.postService.paginate(page);
  }

  @Get('/:id')
  async getPost(@Param() id: any) {
    return await this.postService.getPost(id?.id);
  }

  @Post('/write')
  // @UseGuards(AuthGuard('jwt'))
  createPost(@Body() post: CreatePostDto) {
    console.log(post);
    return this.postService.create(post);
  }

  @Patch('/:id')
  async updatePost(@Param() id: any, @Body() post: UpdatePostDto) {
    console.log(id?.id, post);
    return this.postService.updatePost(id?.id, post);
  }

  @Post('/delete/:id')
  async deletePost(@Param() id: string) {
    return this.postService.deletePost(id);
  }
}

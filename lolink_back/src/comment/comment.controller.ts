import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('/write')
  createComment(@Body() comment: CreateCommentDto) {
    return this.commentService.create(comment);
  }

  @Get('/:postId')
  async getComments(@Param() postId: string) {
    return this.commentService.getComments(postId);
  }

  @Post('/delete/:id')
  async deleteComment(@Param() id: string) {
    return this.commentService.deletePost(id);
  }
}

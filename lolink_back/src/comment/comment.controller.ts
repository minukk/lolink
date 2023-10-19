import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('/write')
  @UseGuards(JwtAuthGuard)
  createComment(@Body() comment: CreateCommentDto) {
    return this.commentService.create(comment);
  }

  @Get('/:postId')
  async getComments(@Param() postId: any, @Query('page') page: number) {
    return this.commentService.paginate(postId?.postId, page);
  }

  @Post('/delete/:id')
  @UseGuards(JwtAuthGuard)
  async deleteComment(@Param() id: string) {
    return this.commentService.deleteComment(id);
  }
}

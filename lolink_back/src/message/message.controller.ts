import { Body, Controller, Param } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  async getMessage(@Param() id: number) {
    return this.messageService.getMessage(id);
  }

  async getMessageRecevierAll(@Param() id: Buffer) {
    return this.messageService.getMessageRecevierAll(id);
  }

  async getMessageCallerAll(@Param() id: Buffer) {
    return this.messageService.getMessageCallerAll(id);
  }

  createMessage(@Body() message: CreateMessageDto) {
    return this.messageService.create(message);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async create(_message) {
    return this.messageRepository.save(_message);
  }

  async getMessage(id) {
    const result = await this.messageRepository.findOne({
      where: { id },
    });

    return result;
  }

  async getMessageRecevierAll(_userId) {
    const results = await this.messageRepository.find({
      where: { receiverId: _userId },
    });

    return results;
  }

  async getMessageCallerAll(_userId) {
    const results = await this.messageRepository.find({
      where: { callerId: _userId },
    });

    return results;
  }
}

import { Controller, Post, Patch, Get } from '@nestjs/common';
// import { CreateUserDto } from './dtos/create-user.dto';

@Controller('user')
export class UserController {
  @Get('/:id')
  async getUser() {}

  @Post('/signup')
  async createUser() {}

  @Post('/signin')
  async loginUser() {}

  @Post('/delete/:id')
  async deleteUser() {}

  @Patch('/:id')
  updateUser() {}
}

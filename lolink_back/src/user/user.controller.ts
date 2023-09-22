import {
  Controller,
  Post,
  Patch,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
  Response,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import {
  AuthenticatedGuard,
  GoogleAuthGuard,
  LocalAuthGuard,
  NaverAuthGuard,
} from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get('/getUser/:nickname')
  async getUser(@Param('nickname') nickname: string) {
    const user = await this.userService.getUser(nickname);
    console.log(user);
    return user;
  }

  @Post('/signup')
  async createUser(@Body() user: CreateUserDto) {
    return this.authService.createUser(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async loginUser(@Body() user: User) {
    return this.authService.signin(user.email, user.password);
  }

  @Post('/delete/:email')
  async deleteUser(@Param('email') email: string) {
    return this.userService.deleteUser(email);
  }

  @Patch('/update/:email')
  updateUser(@Param('email') email: string, @Body() user: UpdateUserDto) {
    console.log(user);
    return this.userService.updateUser(email, user);
  }

  @Get('to-google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req) {}

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req, @Response() res) {
    const { user } = req;
    return res.send(user);
  }

  @Get('to-naver')
  @UseGuards(NaverAuthGuard)
  async naverAuth(@Request() req) {}

  @Get('naver')
  @UseGuards(NaverAuthGuard)
  async naverAuthRedirect(@Request() req, @Response() res) {
    const { user } = req;
    return res.send(user);
  }
}

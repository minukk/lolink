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
  Inject,
  LoggerService,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  AuthenticatedGuard,
  GoogleAuthGuard,
  LocalAuthGuard,
  NaverAuthGuard,
} from 'src/auth/auth.guard';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: LoggerService,
  ) {}

  @Get('/getUser/:email')
  async getUserEmail() {}

  @Get('/getUser/:nickname')
  async getUserNick(@Param('nickname') nickname: string) {
    const user = await this.userService.getUser(nickname);
    console.log(user);
    return user;
  }

  @Post('/signup')
  async createUser(@Body() user: CreateUserDto): Promise<void> {
    this.printWinstonLog(user);

    return this.authService.createUser(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async loginUser(@Body() user: User) {
    return this.authService.signin(user.email, user.password);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('/delete/:email')
  async deleteUser(@Param('email') email: string) {
    return this.userService.deleteUser(email);
  }

  @UseGuards(AuthenticatedGuard)
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

  private printLoggerServiceLog(dto) {
    try {
      throw new InternalServerErrorException('test');
    } catch (error) {
      this.logger.error('error: ' + JSON.stringify(dto), error.stack);
    }
    this.logger.warn('warn: ' + JSON.stringify(dto));
    this.logger.log('log: ' + JSON.stringify(dto));
    this.logger.verbose('verbose: ' + JSON.stringify(dto));
    this.logger.debug('debug: ' + JSON.stringify(dto));
  }
}

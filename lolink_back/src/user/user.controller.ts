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
  // Inject,
  // LoggerService,
  // InternalServerErrorException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  AuthenticatedGuard,
  GoogleAuthGuard,
  NaverAuthGuard,
} from 'src/auth/auth.guard';
import { AuthGuard } from '@nestjs/passport';
// import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService, // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: LoggerService,
  ) {}

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  async getMyAuth(@Request() req: any) {
    const user = req.user;
    return user;
  }

  @Get('/getUser/:email')
  @UseGuards(AuthGuard('jwt'))
  async getUserEmail(@Param('email') email: string) {
    const user = await this.userService.getUserEmail(email);
    console.log(user);
    return user;
  }

  @Get('/getUser/:nickname')
  @UseGuards(AuthGuard('jwt'))
  async getUserNick(@Param('nickname') nickname: string) {
    const user = await this.userService.getUserNick(nickname);
    return user;
  }

  @Post('/signup')
  async createUser(@Body() user: CreateUserDto): Promise<void> {
    // this.printLoggerServiceLog(user);

    return this.authService.createUser(user);
  }

  // @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async loginUser(@Body() user: User) {
    return this.authService.signin(user.email, user.password);
  }

  // @UseGuards(AuthenticatedGuard)
  @Post('/logout')
  @UseGuards(AuthGuard('jwt'))
  logout(@Request() req, @Response() res): any {
    res.clearCookie('lolink');
    req.logout((err) => {
      if (err) {
        return res.status(500).send('로그아웃 중 오류가 발생');
      }
    });
    res.send('로그아웃 성공');
  }

  // @UseGuards(AuthenticatedGuard)
  @Post('/delete/:email')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Param('email') email: string) {
    return this.userService.deleteUser(email);
  }

  // @UseGuards(AuthenticatedGuard)
  @Patch('/update/:email')
  @UseGuards(AuthGuard('jwt'))
  updateUser(@Param('email') email: string, @Body() user: UpdateUserDto) {
    return this.userService.updateUser(email, user);
  }

  @Get('to-google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req: Request) {
    console.log(req);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req, @Response() res) {
    const { user } = req;
    return res.send(user);
  }

  @Get('to-naver')
  @UseGuards(NaverAuthGuard)
  async naverAuth(@Request() req: Request) {
    console.log(req);
  }

  @Get('naver')
  @UseGuards(NaverAuthGuard)
  async naverAuthRedirect(@Request() req, @Response() res) {
    const { user } = req;
    return res.send(user);
  }

  // private printLoggerServiceLog(dto) {
  //   try {
  //     throw new InternalServerErrorException('test');
  //   } catch (error) {
  //     this.logger.error('error: ' + JSON.stringify(dto), error.stack);
  //   }
  //   this.logger.warn('warn: ' + JSON.stringify(dto));
  //   this.logger.log('log: ' + JSON.stringify(dto));
  //   this.logger.verbose('verbose: ' + JSON.stringify(dto));
  //   this.logger.debug('debug: ' + JSON.stringify(dto));
  // }
}

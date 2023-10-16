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
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GoogleAuthGuard, NaverAuthGuard } from 'src/auth/auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
// import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService, // @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: LoggerService,
  ) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getMyAuth(@Request() req: any) {
    const user = req.user;
    console.log(user);
    return user;
  }
  // @Get('/me')
  // @UseGuards(JwtAuthGuard)
  // async getMyAuth(@Request() req: any) {
  //   const user = await this.userService.getUserAndLikes(req.user.id);
  //   return user;
  // }

  @Get('/getUser/:email')
  @UseGuards(JwtAuthGuard)
  async getUserEmail(@Param('email') email: string) {
    const user = await this.userService.getUserEmail(email);
    console.log(user);
    return user;
  }

  @Get('/user/:id')
  // @UseGuards(JwtAuthGuard)
  async getUserInfo(@Param('id') id) {
    const user = await this.userService.getUserAndLikes(id?.id);
    return user;
  }

  @Post('/signup')
  async createUser(@Body() user: CreateUserDto): Promise<void> {
    // this.printLoggerServiceLog(user);

    return this.authService.createUser(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/signin')
  async loginUser(@Body() body) {
    return this.authService.signin(body);
  }

  // @UseGuards(AuthenticatedGuard)
  @Post('/logout')
  @UseGuards(JwtAuthGuard)
  logout(@Request() req, @Response() res): any {
    res.clearCookie();
    req.logout((err) => {
      if (err) {
        return res.status(500).send('로그아웃 중 오류가 발생');
      }
    });
    res.send('로그아웃 성공');
  }

  // @UseGuards(AuthenticatedGuard)
  @Post('/delete/:email')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Param('email') email: string) {
    return this.userService.deleteUser(email);
  }

  // @UseGuards(AuthenticatedGuard)
  @Patch('/update/:email')
  @UseGuards(JwtAuthGuard)
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

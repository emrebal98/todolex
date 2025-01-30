import { Public } from '@/common/decorator';
import { LocalAuthGuard } from '@/common/guard';
import { Body, Controller, Get, Post, Req, Session as Ses, UseGuards } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { Session } from 'express-session';
import { AuthDto, UserDto } from './dto';
import { AuthService } from './service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @Public()
  async register(@Body() authDto: AuthDto) {
    return this.authService.register(authDto.email, authDto.password);
  }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  login(@Body() _: AuthDto) {
    return this.authService.login();
  }

  @Get('session')
  session(@Ses() session: Session) {
    return session;
  }

  @Post('logout')
  logout(@Req() req: Request): void {
    return this.authService.logout(req);
  }

  @Get('profile')
  @ApiCookieAuth()
  profile(@Req() req: Request): UserDto | undefined {
    return req.user as UserDto;
  }
}

import { Public } from '@/common/decorator';
import { LocalAuthGuard } from '@/common/guard';
import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiOkResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AccessToken, AuthDto, UserDto } from './dto';
import { AuthService } from './service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @Public()
  @ApiOkResponse({ type: AccessToken })
  async register(@Body() authDto: AuthDto): Promise<AccessToken> {
    return this.authService.register(authDto.email, authDto.password);
  }

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({ type: AccessToken })
  login(@Body() _: AuthDto, @Req() req: Request): Promise<AccessToken> {
    return this.authService.login(req.user as UserDto);
  }

  @Get('profile')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserDto })
  profile(@Req() req: Request): UserDto | undefined {
    return req.user as UserDto;
  }

  @Get('validate')
  @ApiBearerAuth()
  validate(@Req() req: Request, @Res() res: Response) {
    const user = req.user as UserDto;
    if (!user || user?.id === undefined) {
      throw new UnauthorizedException();
    }
    res.setHeader('X-User-Id', user.id);
    return res.status(200).send();
  }

  @Get('health')
  @Public()
  @ApiExcludeEndpoint()
  health() {
    return 'OK';
  }
}

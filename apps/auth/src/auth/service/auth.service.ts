import { PrismaService } from '@/prisma/prisma.service';
import { HttpStatus, Injectable, Req, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { UserDto } from '../dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(email: string, password: string): Promise<UserDto> {
    if (!email || !password) throw new UnauthorizedException();
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException();
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException();

    return { id: user.id, email: user.email };
  }

  async register(email: string, password: string): Promise<UserDto> {
    if (!email || !password) throw new UnauthorizedException();
    const userExists = await this.prisma.user.findUnique({ where: { email } });
    if (userExists) throw new UnauthorizedException();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({ data: { email, password: hashedPassword } });

    return { id: user.id, email: user.email };
  }

  login() {
    return {
      message: 'Login successful',
      statusCode: HttpStatus.OK,
    };
  }

  logout(@Req() req: Request) {
    req.session.destroy(() => {
      return {
        message: 'Logout successful',
        statusCode: HttpStatus.OK,
      };
    });
  }
}

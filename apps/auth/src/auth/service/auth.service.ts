import { PrismaService } from '@/prisma/prisma.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccessToken, UserDto } from '../dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto> {
    if (!email || !password) throw new BadRequestException('Email and password are required');
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('Invalid credentials');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    return { id: user.id, email: user.email };
  }

  async register(email: string, password: string): Promise<AccessToken> {
    if (!email || !password) throw new BadRequestException('Email and password are required');
    const userExists = await this.prisma.user.findUnique({ where: { email } });
    if (userExists) throw new BadRequestException('User already exists');
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({ data: { email, password: hashedPassword } });

    return this.login({ id: user.id, email: user.email });
  }

  async login(user: UserDto): Promise<AccessToken> {
    const payload = { email: user.email, id: user.id };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}

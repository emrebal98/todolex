import { PrismaService } from '@/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService, LocalStrategy, SessionSerializer } from './service';

@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer, PrismaService],
})
export class AuthModule {}

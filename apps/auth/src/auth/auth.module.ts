import { PrismaService } from '@/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './service';
import { EnvService } from '@/env/env.service';
import { JwtStrategy, LocalStrategy } from './strategy';
import { EnvModule } from '@/env/env.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [EnvModule],
      useFactory: (envService: EnvService) => ({
        secret: envService.get('JWT_SECRET'),
        signOptions: { expiresIn: envService.get('JWT_ACCESS_TOKEN_EXPIRES_IN_SECONDS') },
      }),
      inject: [EnvService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, PrismaService],
})
export class AuthModule {}

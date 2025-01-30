import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { EnvModule } from '@/env/env.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticatedGuard } from '@/common/guard';

@Module({
  imports: [EnvModule, AuthModule],
  providers: [{ provide: APP_GUARD, useClass: AuthenticatedGuard }],
})
export class AppModule {}

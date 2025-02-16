import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { EnvModule } from '@/env/env.module';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { AuthenticatedGuard } from '@/common/guard';
import { AllExceptionsFilter } from '@/common/exception';

@Module({
  imports: [EnvModule, AuthModule],
  providers: [
    { provide: APP_GUARD, useClass: AuthenticatedGuard },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {}

import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvService } from './env.service';
import { validateEnv } from './env.schema';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ validate: validateEnv })],
  providers: [ConfigService, EnvService],
  exports: [EnvService],
})
export class EnvModule {}

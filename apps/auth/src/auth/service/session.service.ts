import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserDto } from '../dto';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: UserDto, done: (err: Error | null, user?: UserDto) => void): void {
    done(null, user);
  }

  deserializeUser(user: UserDto, done: (err: Error | null, user?: UserDto) => void): void {
    done(null, user);
  }
}

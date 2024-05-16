import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const {password, ...remaining} = user;

    const payload = { user: remaining };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(username: string, pass: string) : Promise<{ access_token: string }> {
    this.usersService.addOne(username, pass);

    return await this.signIn(username, pass);
  }
}

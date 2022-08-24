

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ) {}


  async login(data: any) {
    console.log(data)
    // const payload = { username: user.username, sub: user.userId };
    const payload = {name:data.name}
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
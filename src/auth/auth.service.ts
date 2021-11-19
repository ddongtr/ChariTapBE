import { Injectable } from '@nestjs/common';
import { Payload } from 'src/schemas/user.schema';
import { sign } from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signPayload(payload: Payload) {
    return sign(payload, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRED_IN,
    });
  }
  async validateUser(payload: Payload) {
    return await this.userService.findByPayload(payload);
  }
}

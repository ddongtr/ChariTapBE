import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import RegisterDto from 'src/users/dto/register.dto';
import LoginDto from 'src/users/dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ) { }

    //calling for register new user
    @Post('register')
    async register(@Body() RegisterDto: RegisterDto) {
      const user = await this.usersService.create(RegisterDto);
      const payload = {
        username: user.username,
      };
  
      const token = await this.authService.signPayload(payload);
      return { user, token };
    }

    //calling for login with exits validate user
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
      const user = await this.usersService.findByLogin(loginDto);
      const payload = {
        username: user.username,
      };
      const token = await this.authService.signPayload(payload);
      return { user, token};
    }
}

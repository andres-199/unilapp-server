import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginData } from './login-data.interface';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() userData: LoginData) {
    return await this.authService.login(userData);
  }

  @Post('send-code')
  sendCode(@Body('email') email: string) {
    return this.authService.sendCode(email);
  }

  @Post('account-recovery')
  accountRecovery(@Body('code') code: string) {
    return this.authService.accountRecovery(code);
  }
}

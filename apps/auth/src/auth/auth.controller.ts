import { Controller, Post, Body, Get, Res, Req, Headers } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { login: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { success, token } = this.authService.login(
      body.login,
      body.password,
    );
    if (success) {
      res.cookie('auth_token', token, { httpOnly: true, sameSite: 'strict' });
    }
    return { success };
  }

  @Get('validate')
  async validate(@Req() req: Request) {
    return this.authService.validateToken(req.cookies['auth_token']);
  }
  @Get('server-validate')
  async serverValidate(@Headers('authorization') authHeader: string) {
    return this.authService.validateToken(authHeader);
  }
}

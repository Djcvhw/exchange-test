import { Controller, Get, Req, UnauthorizedException } from '@nestjs/common';
import { ApiService } from './api.service';
import { Request } from 'express';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('profile')
  async getProfile(@Req() req: Request) {
    const token = req.cookies['auth_token'];
    const isValid = await this.apiService.validateToken(token);
    if (!isValid) {
      throw new UnauthorizedException();
    }
    return this.apiService.getProfile();
  }

  @Get('dashboard')
  async getDashboard(@Req() req: Request) {
    const token = req.cookies['auth_token'];
    const isValid = await this.apiService.validateToken(token);
    if (!isValid) {
      throw new UnauthorizedException();
    }
    return this.apiService.getDashboard();
  }

  @Get('about')
  async getAbout() {
    return this.apiService.getAbout();
  }
}

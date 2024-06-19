import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly users = [{ id: 1, username: 'admin', password: 'password' }];
  private readonly jwtSecret = 'SecretKey';

  login(username: string, password: string) {
    const user = this.users.find(
      (user) => user.username === username && user.password === password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      this.jwtSecret,
      {
        expiresIn: '1h',
      },
    );

    return { success: true, token };
  }

  validateToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      return { valid: true, decoded };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}

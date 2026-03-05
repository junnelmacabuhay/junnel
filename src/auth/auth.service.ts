// auth.service.ts
import { Injectable } from '@nestjs/common';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    if (username === 'admin' && password === '1234') {
      return { message: 'Login successful', token: 'fake-jwt-token' };
    }
    return { message: 'Invalid credentials' };
  }
}

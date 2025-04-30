import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SafeUser, UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/users.entity';
// adjust the import path

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<SafeUser> {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Exclude sensitive fields from the returned user object
    const { password, ...result } = user;
    return result as SafeUser;
  }

  async login(loginDto: LoginDto): Promise<{
    access_token: string;
    user: SafeUser;
  }> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    return {
      access_token: this.jwtService.sign({
        email: user.email,
        productCode: user.productCode,
      }),
      user,
    };
  }

  async getUserProfile(userId: string): Promise<SafeUser> {
    console.log(userId);
    const user = await this.usersService.findByEmail(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const { password, ...result } = user;
    return result as SafeUser;
  }
}

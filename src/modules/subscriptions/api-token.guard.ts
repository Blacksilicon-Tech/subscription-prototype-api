// api-token.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
// You'll need to create this

@Injectable()
export class ApiTokenGuard implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Bearer token missing');
    }

    try {
      // Verify the token using your API_SECRET
      const decoded = jwt.verify(
        token,
        process.env.API_SECRET || 'apiSecretKey',
      ) as any;

      // Find user by ID from the token
      const user = await this.userService.findById(decoded.id);

      // Verify the token matches the one stored in the database
      if (!user || user.apiToken !== token) {
        throw new UnauthorizedException('Invalid API token');
      }

      // Attach user to request
      request.user = user;
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired API token');
    }
  }
}

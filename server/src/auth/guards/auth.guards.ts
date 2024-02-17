import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from '../config/constants/key-decorators';
import { IUseToken } from '../types/interfaces/auth.interface';
import { useToken } from '../utils/useToken';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly reflector: Reflector, // permite leer atributos de decoradores
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest<Request>();
    const token = req.headers.authorization;
    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Invalid Token');
    }

    const manageToken: IUseToken | string = useToken(token);

    if (typeof manageToken === 'string') {
      throw new UnauthorizedException(manageToken);
    }

    if (manageToken.isExpired) {
      throw new UnauthorizedException('Token Expired');
    }

    const { id } = manageToken;
    const user = await this.usersService.findUserById(id);
    if (!user) {
      throw new UnauthorizedException('Invalid User');
    }
    req.userAuth = { id: user.id, role: user.role };
    return true;
  }
}

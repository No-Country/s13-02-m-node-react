import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import {
  ADMIN_KEY,
  PUBLIC_KEY,
  ROLES_KEY,
} from 'src/config/constants/key-decorators';
import { Request } from 'express';
import { ROLES } from 'src/config/constants/roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }

    const roles = this.reflector.get<Array<keyof typeof ROLES>>(
      ROLES_KEY,
      context.getHandler(),
    );

    const admin = this.reflector.get<string>(ADMIN_KEY, context.getHandler());

    const req = context.switchToHttp().getRequest<Request>();
    const userRole = req.userAuth.role;

    if (userRole === ROLES.ADMIN) {
      return true;
    }
    if (roles === undefined) {
      if (!admin) {
        return true;
      } else if (admin && userRole === admin) {
        return true;
      } else {
        throw new UnauthorizedException(
          "You don't have privileges for this action",
        );
      }
    }

    const isAuth = roles.some((role) => role === userRole);
    if (!isAuth) {
      throw new UnauthorizedException(
        "You don't have privileges for this action",
      );
    }
    return true;
  }
}

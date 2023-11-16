import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ADMIN_KEY, PUBLIC_KEY } from 'src/common/constants/key.decorator';
import { ROLES } from 'src/common/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) return true;

    const role = this.reflector.get<keyof typeof ROLES>(
      ADMIN_KEY,
      context.getHandler(),
    );

    if (!isPublic && !role) return true;

    if (role === ROLES.ADMIN) {
      const { roleUser } = context.switchToHttp().getRequest<Request>();
      if (roleUser === ROLES.ADMIN) return true;
      else
        throw new UnauthorizedException(
          'You do not have permissions for this operation',
        );
    }
    return false;
  }
}

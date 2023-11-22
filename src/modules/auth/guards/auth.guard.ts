import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PUBLIC_KEY } from 'src/common/constants/key.decorator';
import { UsersService } from 'src/modules/users/services/users.service';
import { useToken } from 'src/utils/use.token';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(req);
    if (!token || typeof token !== 'string')
      throw new UnauthorizedException('Invalid token');

    const payloadToken = useToken(token);

    if (typeof payloadToken === 'string')
      throw new UnauthorizedException(payloadToken);

    const user = await this.userService.findOne(payloadToken.sub);

    if (!user) throw new UnauthorizedException('Invalid user');

    req.idUser = user.id;
    req.roleUser = user.role.name;
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

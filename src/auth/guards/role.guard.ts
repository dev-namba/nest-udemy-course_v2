import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { UserStatus } from '../user-status.enum';

@Injectable()
export class RoleGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredStatuses = this.reflector.get<UserStatus[]>(
      'statuses',
      context.getHandler(),
    );
    if (!requiredStatuses) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    return requiredStatuses.some((status) => user.status.includes(status));
  }
}
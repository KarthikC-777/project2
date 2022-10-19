import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Req,
  Body,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserDto } from './dto/user.dto';

import { Role } from './entities/role.enum';
import { ROLES_KEY } from './entities/roles.decorator';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    // const { user } = context.switchToHttp().getRequest();
    // return requiredRoles.some((role) => user.roles?.includes(role));

    // const user: User = {
    //   name: 'Karthik',
    //   roles: [Role.Admin],
    // };

    const user = this.userService.findRole();
    // return requiredRoles.some((role) => user.accessRole.includes(role));
  }
}

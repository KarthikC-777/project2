import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Req,
  Body,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UserDto } from './dto/user.dto';

import { ROLES_KEY } from './entities/roles.decorator';

import { UserService } from './user.service';
import * as request from 'supertest';
import { JwtService } from '@nestjs/jwt';
import { user } from './user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    try {
      const request = context.switchToHttp().getRequest();

      const ver = this.jwtService.verify(request.cookies.userlogoutcookie);
      if (!ver) {
        throw new HttpException('Unauthorized admin User error ', 401);
      }

      return requiredRoles.some((role) => ver.role?.includes(role));
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
  }
}

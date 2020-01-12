import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { UserService } from './user.service';
import { Request } from 'express';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private readonly authService: UserService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {

    const header = (context.switchToHttp().getRequest() as Request).headers.authorization;
    if  (!header || !await this.authService.VerifyToken(header)) {
     
      return false;
    }

    return true;
  }
}

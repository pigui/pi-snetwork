import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccessTokenGuard } from './access-token.guard';
import { Reflector } from '@nestjs/core';
import { AuthType } from '../enums';
import { AUTH_TYPE_KEY } from '../decorators';

@Injectable()
export class AuthGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: { canActivate: () => true },
  };
  constructor(
    private readonly accessTokenGuard: AccessTokenGuard,
    private readonly reflector: Reflector
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes: AuthType[] = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()]
    ) ?? [AuthGuard.defaultAuthType];
    const guards: CanActivate[] = authTypes
      .map((type) => this.authTypeGuardMap[type])
      .flat();
    let error: UnauthorizedException = new UnauthorizedException();
    for (const instance of guards) {
      const canActivate = await Promise.resolve(
        instance.canActivate(context)
      ).catch((err) => {
        error = err;
      });

      if (canActivate) {
        return true;
      }
    }
    throw error;
  }
}

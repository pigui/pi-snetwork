import { AuthMS } from '@backend/microservices';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { FastifyRequest } from 'fastify';
import { REQUEST_USER_KEY } from '../constants';
import { User } from '../dto';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    @Inject(AuthMS.SERVICE_NAME) private readonly client: ClientKafka
  ) {
    this.client.subscribeToResponseOf(AuthMS.VALIDATE_TOKEN);
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const ctx: GqlExecutionContext = GqlExecutionContext.create(context);
      const accessToken: string = this.getTokenFromHeader(ctx.getContext().req);
      if (!accessToken) {
        return false;
      }
      const user: User = await lastValueFrom(
        this.client.send<User>(AuthMS.VALIDATE_TOKEN, accessToken)
      );
      if (!user) {
        return false;
      }
      ctx.getContext().req[REQUEST_USER_KEY] = user;
      return true;
    } catch (e) {
      return false;
    }
  }

  private getTokenFromHeader(req: FastifyRequest): string {
    const [type, token] = req?.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

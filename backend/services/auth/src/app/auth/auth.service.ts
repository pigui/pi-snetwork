import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginWithPasswordDto } from './dto';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/models';
import { RpcException } from '@nestjs/microservices';
import jwtConfig from './config/jwt.config';
import { HashingService } from '@backend/hashing';
import { v4 as uuidv4 } from 'uuid';
import { ActiveUserData } from './interfaces';

import { RefreshTokenIdsStorage } from './refresh-token-ids.storage';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly hashingService: HashingService,
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage
  ) {}
  async loginWithPassword(loginWithPasswordDto: LoginWithPasswordDto) {
    try {
      const findUser: UserDocument = await this.usersService.findOnebyEmail(
        loginWithPasswordDto.email
      );
      if (!findUser) {
        throw new NotFoundException();
      }

      if (
        !(await this.hashingService.compare(
          loginWithPasswordDto.password,
          findUser.password
        ))
      ) {
        throw new UnauthorizedException();
      }

      return await { ...(await this.generateTokens(findUser)), user: findUser };
    } catch (e) {
      throw new RpcException(e);
    }
  }

  private async generateTokens(user: UserDocument): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const refreshTokenId = uuidv4();
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user._id.toString(),
        this.jwtConfiguration.accessTokenTtl,
        { email: user.email }
      ),
      this.signToken(
        user._id.toString(),
        this.jwtConfiguration.refreshTokenTtl,
        { refreshTokenId }
      ),
    ]);

    await this.refreshTokenIdsStorage.insert(
      user._id.toString(),
      refreshTokenId
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  private async signToken<T>(
    userId: string,
    expiresIn: number,
    payload?: T
  ): Promise<string> {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      }
    );
  }
}

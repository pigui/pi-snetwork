import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginWithPasswordDto, RefreshTokensDto } from './dto';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/models';
import { RpcException } from '@nestjs/microservices';
import jwtConfig from './config/jwt.config';
import { HashingService } from '@backend/hashing';
import { v4 as uuidv4 } from 'uuid';
import { ActiveUserData } from './interfaces';
import {
  InvalidatedRefreshTokenError,
  RefreshTokenIdsStorage,
} from './refresh-token-ids.storage';

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
  async loginWithPassword(loginWithPasswordDto: LoginWithPasswordDto): Promise<{
    accessToken: string;
    refreshToken: string;
    user: UserDocument;
  }> {
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

  async refreshTokens({ refreshToken }: RefreshTokensDto): Promise<{
    accessToken: string;
    refreshToken: string;
    user: UserDocument;
  }> {
    try {
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'> & { refreshTokenId: string }
      >(refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });
      const user = await this.usersService.findOneById(sub);

      if (!user) {
        throw new NotFoundException();
      }

      const isValid = await this.refreshTokenIdsStorage.validate(
        user._id.toString(),
        refreshTokenId
      );

      if (isValid) {
        this.refreshTokenIdsStorage.invalidate(user._id.toString());
      } else {
        throw new Error('Refresh token is invalid');
      }

      return await { ...(await this.generateTokens(user)), user };
    } catch (e) {
      if (e instanceof InvalidatedRefreshTokenError) {
        throw new RpcException(new UnauthorizedException('Access denied'));
      }
      throw new RpcException(new UnauthorizedException());
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

  async verifyToken(accessToken: string): Promise<ActiveUserData> {
    try {
      const payload: ActiveUserData =
        await this.jwtService.verifyAsync<ActiveUserData>(
          accessToken,
          this.jwtConfiguration
        );

      return payload;
    } catch (e) {
      throw new RpcException(new UnauthorizedException());
    }
  }
}

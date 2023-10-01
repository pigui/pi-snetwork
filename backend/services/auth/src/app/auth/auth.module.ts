import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@backend/config';
import { UsersModule } from '../users/users.module';
import jwtConfig from './config/jwt.config';
import { RedisModule } from '@backend/redis';
import redisConfig from './config/redis.config';
import { HashingModule } from '@backend/hashing';
import { RefreshTokenIdsStorage } from './refresh-token-ids.storage';

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    RedisModule.registerAsync(redisConfig.asProvider()),
    HashingModule,
    UsersModule,
  ],
  providers: [AuthService, RefreshTokenIdsStorage],
  controllers: [AuthController],
})
export class AuthModule {}

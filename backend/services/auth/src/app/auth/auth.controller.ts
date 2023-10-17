import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthMS } from '@backend/microservices';
import { LoginWithPasswordDto, RefreshTokensDto } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(AuthMS.LOGIN_WITH_PASSWORD)
  loginWithPassword(@Payload() loginWithPasswordDto: LoginWithPasswordDto) {
    return this.authService.loginWithPassword(loginWithPasswordDto);
  }
  @MessagePattern(AuthMS.REFRESH_TOKENS)
  refreshTokens(@Payload() refreshTokensDto: RefreshTokensDto) {
    return this.authService.refreshTokens(refreshTokensDto);
  }

  @MessagePattern(AuthMS.VALIDATE_TOKEN)
  validateToken(@Payload() accessToken: string) {
    return this.authService.verifyToken(accessToken);
  }
}

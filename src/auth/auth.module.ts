import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { IssuedRefreshTokenModule } from 'src/issued-refresh-token/issued-refresh-token.module';
import { AccessTokenStrategy } from 'src/auth/strategies/access-token.strategy';
import { RefreshTokenStrategy } from 'src/auth/strategies/refresh-token.strategy';

@Module({
  imports: [UserModule, IssuedRefreshTokenModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule {}

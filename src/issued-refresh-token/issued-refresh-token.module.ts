import { Module } from '@nestjs/common';
import { IssuedRefreshTokenService } from './issued-refresh-token.service';

@Module({
  providers: [IssuedRefreshTokenService],
  exports: [IssuedRefreshTokenService],
})
export class IssuedRefreshTokenModule {}

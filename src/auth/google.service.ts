import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { UserDataDto } from 'src/auth/dto/user-data.dto';

@Injectable()
export class GoogleService {
  private readonly oAuth2Client: OAuth2Client;

  constructor(private readonly config: ConfigService) {
    this.oAuth2Client = new OAuth2Client(
      config.get('GOOGLE_ID'),
      config.get('GOOGLE_SECRET'),
    );
  }

  async getUserData(credential: string): Promise<UserDataDto> {
    const payload = (
      await this.oAuth2Client.verifyIdToken({
        idToken: credential,
        audience: this.config.get('GOOGLE_ID'),
      })
    ).getPayload();
    return {
      email: payload.email,
      name: payload.name,
    };
  }
}

/* eslint-disable prettier/prettier */
import { google } from 'googleapis';
import { ConfigService } from '@nestjs/config';

export class EmailToken {
  private static configService: ConfigService;

  public static async getAccessToken() {
    try {
      const oAuth2Client = new google.auth.OAuth2(
        this.configService.get('CLIENT_ID'),
        this.configService.get('CLIENT_SECRET'),
        this.configService.get('REDIRECT_URI'),
      );

      oAuth2Client.setCredentials({
        refresh_token: this.configService.get('REFRESH_TOKEN'),
      });

      const accessToken = await oAuth2Client.getAccessToken();

      this.configService.set('ACCESS_TOKEN', accessToken);
    } catch (error) {
      console.log(`Error getting access token: ${error}`);
    }
  }
}

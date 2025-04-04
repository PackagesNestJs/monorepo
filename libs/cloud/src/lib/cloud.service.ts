import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { MulterFile } from './base/multer-file.interface';

@Injectable()
export class CloudService {
  private accessToken: string | null = null;

  constructor(private readonly configService: ConfigService) {}

  async getAccessToken(): Promise<string> {
    if (this.accessToken) return this.accessToken;
    const tokenUrl = `https://login.microsoftonline.com/${this.configService.get<string>(
      'AZURE_TENANT_ID'
    )}/oauth2/v2.0/token`;
    const params = new URLSearchParams({
      'client_id': this.configService.get<string>('AZURE_CLIENT_ID') || '',
      'client_secret': this.configService.get<string>('AZURE_CLIENT_SECRET') || '',
      'scope': this.configService.get<string>('AZURE_SCOPE') || '',
      'grant_type': 'client_credentials',
    } as Record<string, string>);

    try {
      const response = await axios.post(tokenUrl, params.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      if (!response.data.access_token) {
        throw new Error('No access token received');
      }
      this.accessToken = response.data.access_token;
      return this.accessToken as string;
    } catch (err: any) {
      console.error(
        'Failed to get access token: ',
        err.response?.data || err.message
      );
      throw new InternalServerErrorException('Failed to get access token');
    }
  }


  // Exchange authorization code for access token
  async getAccessTokenCode(code: string): Promise<string> {
    try {
      const tenantId = this.configService.get<string>('AZURE_TENANT_ID') || '';
      const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
      const response = await axios.post(
        tokenUrl,
        new URLSearchParams({
          'client_id': this.configService.get<string>('AZURE_CLIENT_ID') || '',
          'client_secret': this.configService.get<string>('AZURE_CLIENT_SECRET') || '',
          'scope': this.configService.get<string>('AZURE_SCOPE') || '',
          code,
          grant_type: 'authorization_code',
          redirect_uri: this.configService.get<string>(
            'AZURE_URL_REDIRECT'
          ) || '',
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );
      this.accessToken = response.data.access_token;
      return response.data.access_token;
    } catch (error) {
      console.error('Error exchanging code for token', error);
      throw new Error('Failed to get access token');
    }
  }

  async uploadFileToOneDrive(file: MulterFile): Promise<any> {
    const accessToken = await this.getAccessToken();
    const uploadUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/uploads/${file.originalname}:/content`;

    try {
      const uploadResponse = await axios.put(uploadUrl, file.buffer, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Length': file.size.toString(),
          'Content-Type': file.mimetype,
        },
      });

      return {
        message: 'File uploaded successfully',
        fileDetails: uploadResponse.data, // Link to access file
      };
    } catch (error: any) {
      console.error('Upload failed:', error.response?.data || error.message);
      throw new InternalServerErrorException('File upload failed');
    }
  }

  async generateAuthUrl() {
    const baseAuthUrl = `https://login.microsoftonline.com/${this.configService.get<string>(
      'AZURE_TENANT_ID'
    )}/oauth2/v2.0/authorize`;
    const params = new URLSearchParams({
      client_id: this.configService.get<string>(
        'AZURE_CLIENT_ID'
      ) || '',
      response_type: 'code',
      redirect_uri: this.configService.get<string>(
        'AZURE_URL_REDIRECT'
      ) || '',
      response_mode: 'query',
      scope: this.configService.get<string>(
        'AZURE_SCOPE'
      ) || '',
    }).toString();
    return `${baseAuthUrl}?${params}`;
  }
}

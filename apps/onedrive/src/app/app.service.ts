import { Injectable } from '@nestjs/common';
import { CloudService } from '@core/cloud';

@Injectable()
export class AppService {
  constructor(private readonly cloudService: CloudService) {}

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async getToken() {
    return await this.cloudService.getAccessToken();
  }

  async getAccessToken(code: string) {
    return await this.cloudService.getAccessTokenCode(code);
  }
  async uploadFile(file: Express.Multer.File) {
    const res = await this.cloudService.uploadFileToOneDrive(file);
    console.log(res);
    return `File uploaded successfully: ${file.originalname}`;
  }

  async getAuthUrl() {
    return await this.cloudService.generateAuthUrl();
  }
}

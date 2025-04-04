import { Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { DeepSeekFactory } from '@core/deep-seek';

@Controller()
export class AppController {
  const deepSeekService= DeepSeekFactory.createDeepSeekService();

  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if(!file) {
      throw new Error('No file uploaded');
    }
    return this.appService.uploadFile(file);
  }
  @Get('token')
  getToken() {
    return this.appService.getToken();
  }

  @Get('login')
  async getAuthUrl() {
    const authUrl = await this.appService.getAuthUrl();
    return { url: authUrl };
  }

  // Step 2: Handle the callback from Microsoft after user logs in
  @Get('callback')
  async callback(@Query('code') code: string) {
    // Step 3: Exchange the authorization code for an access token
    const accessToken = await this.appService.getAccessToken(code);
    return { message: 'Authenticated successfully', accessToken };
  }

  @Post('chat')
  async chat(@Body() body: any) {
    const response = await this.deepSeekService.chat({query: body.message});
    return { response };
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudService, CoreCloudModule } from '@core/cloud';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CoreCloudModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    })
  ],
  controllers: [AppController],
  providers: [AppService, CloudService],
})
export class AppModule {}

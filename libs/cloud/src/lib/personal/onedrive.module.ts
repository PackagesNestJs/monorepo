import { Module } from '@nestjs/common';
import { OnedriveService } from './onedrive.service';
import { ConfigModule } from '@nestjs/config';
import { OnedriveController } from './onedrive.controller';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        PORT: Joi.number().integer(),
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        APP_NAME: Joi.string().valid('development', 'production').required(),
        AZURE_CLIENT_ID: Joi.string().required(),
        AZURE_CLIENT_SECRET: Joi.string().required(),
        AZURE_SCOPE: Joi.string().default(
          'https://graph.microsoft.com/.default'
        ),
      }),
    }),
  ],
  providers: [OnedriveService],
  controllers: [OnedriveController],
})
export class OnedriveModule {}

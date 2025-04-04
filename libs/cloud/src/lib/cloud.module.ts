import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudService } from './cloud.service';
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
        APP_NAME: Joi.string().required(),
        AZURE_CLIENT_ID: Joi.string().required(),
        AZURE_CLIENT_SECRET: Joi.string().required(),
        AZURE_TENANT_ID: Joi.string().when('AWS_TYPE', {
          is: 'organization',
          then: Joi.required(),
          otherwise: Joi.optional(),
        }),
        AZURE_SCOPE: Joi.string().default(
          'https://graph.microsoft.com/.default'
        ),
      }),
    }),

  ],
  providers: [CloudService],
  exports: [CloudService],
})
export class CoreCloudModule {}

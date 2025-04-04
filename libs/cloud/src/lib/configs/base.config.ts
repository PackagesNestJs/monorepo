import { IAppConfig } from '../base/auth.interface';

export abstract class BaseConfig {
  protected getCommonConfig(): IAppConfig {
    return {
      port: parseInt(process.env.PORT || '3000', 10),
      appName: process.env.APP_NAME || 'my-app',
      nodeEnv: (process.env.NODE_ENV || 'development') as 'development' | 'production',
      azure: {
        clientId: process.env.AZURE_CLIENT_ID || '',
        clientSecret: process.env.AZURE_CLIENT_SECRET || '',
        scope: process.env.AZURE_SCOPE || 'https://graph.microsoft.com/.default',
        tenantId: process.env.AZURE_TENANT_ID || '',
      },
    };
  }

  abstract getConfig(): IAppConfig;
}

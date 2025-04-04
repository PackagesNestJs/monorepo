export interface IAzureAuthentication {
  clientId: string;
  clientSecret: string;
  scope: string;
  tenantId?: string;
}

export interface IAppConfig {
  port: number;
  appName: string;
  nodeEnv: 'development' | 'production';
  azure: IAzureAuthentication;
}


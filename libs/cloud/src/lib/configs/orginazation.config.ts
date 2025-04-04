import { IAppConfig } from '../base/auth.interface';
import { BaseConfig } from './base.config';

class OrganizationConfig extends BaseConfig {
  getConfig(): IAppConfig {
    return {
      ...this.getCommonConfig(),
      azure: {
        ...this.getCommonConfig().azure!,
        tenantId: process.env.AZURE_TENANT_ID!,
      },
    } as IAppConfig;
  }
}

export default new OrganizationConfig().getConfig();

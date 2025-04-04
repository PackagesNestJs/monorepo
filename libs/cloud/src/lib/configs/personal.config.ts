import { BaseConfig } from './base.config';
import { IAppConfig } from '../base/auth.interface';

class PersonalConfig extends BaseConfig {
  getConfig(): IAppConfig {
    return {
      ...this.getCommonConfig(),
      azure: {
        ...this.getCommonConfig().azure!,
        tenantId: undefined,
      },
    } as IAppConfig;
  }
}

export default new PersonalConfig().getConfig();

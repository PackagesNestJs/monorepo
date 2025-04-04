import { DeepSeekService } from './deep-seek.service.js';

export class DeepSeekFactory {
  static createDeepSeekService(): DeepSeekService {
    return new DeepSeekService();
  }
}

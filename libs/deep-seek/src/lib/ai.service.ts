import { AccountType, DeepSeekChatRequest } from './types.js';

export class AiService {
  private static model = 'gpt-4o-mini-2024-07-18';
  private static temperature = 0.9;
  private static chatRequest: DeepSeekChatRequest

  public static initChatRequest(message: string): DeepSeekChatRequest {
    this.chatRequest = {
      model: this.model,
      messages: [
        {
          role: AccountType.SYSTEM,
          content: 'You are an AI assistant who knows everything.',
        },
        {
          role: AccountType.USER,
          content: message,
        }
      ],
      temperature: this.temperature,
    };
    return this.chatRequest;
  }
}

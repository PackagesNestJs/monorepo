import { ApiClient } from './api-client.js';
import { DeepSeekChatRequest, DeepSeekChatResponse, DeepSeekRequest, DeepSeekResponse } from './types.js';
import { AiService } from './ai.service.js';

export class DeepSeekService {
  private apiClient= ApiClient.getInstance();

  async fetchData(endPoint: string, request: DeepSeekRequest): Promise<DeepSeekResponse<any> | null> {
    try {
      const response = await this.apiClient.post<DeepSeekResponse<null>>(endPoint, request);
      return response.data
    }catch (e) {
      console.error(e)
      return null;
    }
  }

  async fetchChatData(endPoint: string, request: DeepSeekChatRequest): Promise<DeepSeekChatResponse | null> {
    try {
      const response = await this.apiClient.post<DeepSeekChatResponse>(endPoint, request);
      return response.data;
    } catch (e) {
      console.error(e)
      return null;
    }
  }

  async chat(body: DeepSeekRequest): Promise<DeepSeekChatResponse | null> {
    const chatRequest = AiService.initChatRequest(body.query);
    return this.fetchChatData('/v1/chat/completions', chatRequest);
  }
}

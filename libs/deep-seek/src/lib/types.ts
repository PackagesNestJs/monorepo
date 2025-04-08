export interface DeepSeekRequest {
  query: string;
  options?: {
    timeout?: number;
    retries?: number;
  }
}
export enum AccountType {
  SYSTEM = 'system',
  USER = 'user',
}
type AccountTypes = 'system' | 'user';
type msgContent = {
  role: AccountTypes,
  content: string,
}
export interface DeepSeekChatRequest {
  model: string,
  messages:msgContent[],
  temperature: number,
}

export interface DeepSeekChatResponse {
  message: string;
  conversationId: string;
}

enum ResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}

export interface DeepSeekResponse<T> {
  data: T;
  status: ResponseStatus;
}


export type Headers = Record<string, string> & {
  'Content-Type': 'application/json;charset=UTF-8',
  Authorization: string;
}
export interface AxiosConfig {
  baseURL: string;
  timeout: number;
  headers: Headers
}

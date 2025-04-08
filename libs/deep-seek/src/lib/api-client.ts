import axios, { AxiosInstance } from 'axios';
import { AxiosConfig } from './types.js';

export class ApiClient {
  private static deepSeek: AxiosInstance;

  public static getInstance(): AxiosInstance {
    if (!ApiClient.deepSeek) {
      const axiosConfig: AxiosConfig = {
        baseURL: process.env.API_DEEP_URL || 'https://api.aimlapi.com',
        timeout: parseInt(process.env.API_DEEP_TIMEOUT || '5000', 10),
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Bearer ${process.env.API_DEEP_TOKEN || ''}`,
        }
      };
      ApiClient.deepSeek = axios.create(axiosConfig);
    }
    return ApiClient.deepSeek;
  }


}

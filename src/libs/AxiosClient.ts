import * as authRepository from '../repositories/localStorage/auth.repository';

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { ApiPostAuthRefreshResData } from '../../out/typescript';
import { getAxiosError } from './Error';

class AxiosClient {
  RETRY = 3;

  constructor() {
    this.setAccessToken(authRepository.getAccessToken());
  }

  private axios = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER_HOST,
    withCredentials: true,
  });

  setAccessToken(accessToken: string) {
    if (accessToken === '') return;
    this.axios.defaults.headers.common[
      'Authorization'
    ] = `bearer ${accessToken}`;
    authRepository.setAccessToken(accessToken);
  }

  resetAccessToken() {
    delete this.axios.defaults.headers.common['Authorization'];
    authRepository.resetAccessToken();
  }

  getAccessToken() {
    return this.axios.defaults.headers.common['Authorization'];
  }

  async refresh(): Promise<ApiPostAuthRefreshResData> {
    try {
      const res = await this.axios.post<
        ApiPostAuthRefreshResData,
        AxiosResponse<ApiPostAuthRefreshResData>
      >('/auth/refresh');

      const { accessToken } = res.data;

      this.setAccessToken(accessToken);

      return res.data;
    } catch (error) {
      this.resetAccessToken();
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      this.resetAccessToken();
      await this.axios.delete<null>('/auth/sign-out');
    } catch (error) {
      throw error;
    }
  }

  async request<T = any, R = AxiosResponse<T>, D = any>(
    config: AxiosRequestConfig<D>,
    retry = this.RETRY,
  ): Promise<R> {
    try {
      if (retry <= 0) throw new Error('Network Error');
      return await this.axios.request(config);
    } catch (error) {
      const axiosError = getAxiosError(error);
      if (axiosError) {
        const { errorCode } = axiosError;
        if (errorCode === 4011) {
          await this.refresh();
          return await this.request(config, retry - 1);
        }
      }
      throw error;
    }
  }

  async get<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.request({
        method: 'get',
        url,
        ...config,
      });
    } catch (error: any) {
      throw error;
    }
  }

  async post<T = any, D = any>(
    url: string,
    data: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.request({
        method: 'post',
        url,
        data,
        ...config,
      });
    } catch (error: any) {
      throw error;
    }
  }

  async delete<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.request({
        method: 'delete',
        url,
        ...config,
      });
    } catch (error: any) {
      throw error;
    }
  }

  async patch<T = any, D = any>(
    url: string,
    data: D,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.request({
        method: 'patch',
        url,
        data,
        ...config,
      });
    } catch (error: any) {
      throw error;
    }
  }
}

const axiosClient = new AxiosClient();

export default axiosClient;

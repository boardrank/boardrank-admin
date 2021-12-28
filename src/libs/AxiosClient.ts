import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  ApiPostAuthRefreshReqBody,
  ApiPostAuthRefreshResData,
} from '../../out/typescript';
import * as authRepository from '../repositories/localStorage/auth.repository';
import { getAxiosError } from './Error';

class AxiosClient {
  refreshToken = '';
  retry = 3;

  constructor() {
    this.setRefreshToken(authRepository.getRefreshToken());
    this.setAccessToken(authRepository.getAccessToken());
  }

  private axios = axios.create({
    baseURL: process.env.REACT_APP_API_SERVER_HOST,
    withCredentials: true,
  });

  setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
    authRepository.setRefreshToken(refreshToken);
  }

  resetRefreshToken() {
    this.refreshToken = '';
    authRepository.resetRefreshToken();
  }

  gerRefreshToken() {
    return this.refreshToken;
  }

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

  async refresh() {
    try {
      const res = await this.axios.post<
        ApiPostAuthRefreshResData,
        AxiosResponse<ApiPostAuthRefreshResData>,
        ApiPostAuthRefreshReqBody
      >('/auth/refresh');

      const { refreshToken, accessToken } = res.data;

      this.setRefreshToken(refreshToken);
      this.setAccessToken(accessToken);
    } catch (error) {
      this.resetRefreshToken();
      this.resetAccessToken();
    }
  }

  async request<T = any, R = AxiosResponse<T>, D = any>(
    config: AxiosRequestConfig<D>,
  ): Promise<R> {
    try {
      return await this.axios.request(config);
    } catch (error) {
      const axiosError = getAxiosError(error);
      if (axiosError) {
        const { errorCode } = axiosError;
        if (this.refreshToken !== '' && errorCode === 4011) {
          await this.refresh();
          return await this.request(config);
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

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

class AxiosClient {
  refreshToken = '';
  retry = 3;

  private axios = axios.create({
    baseURL: 'https://api.boardrank.kr/dev/',
  });

  setRefreshToken(refreshToken: string) {
    this.refreshToken = refreshToken;
  }

  resetRefreshToken() {
    this.refreshToken = '';
  }

  gerRefreshToken() {
    return this.refreshToken;
  }

  setAccessToken(accessToken: string) {
    this.axios.defaults.headers.common[
      'Authorization'
    ] = `bearer ${accessToken}`;
  }

  resetAccessToken() {
    delete this.axios.defaults.headers.common['Authorization'];
  }

  getAccessToken() {
    return this.axios.defaults.headers.common['Authorization'];
  }

  handleError(err: AxiosError) {}

  async get<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.axios.get<T, AxiosResponse<T>, D>(url, config);
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
      return await this.axios.post<T, AxiosResponse<T>, D>(url, data, config);
    } catch (error: any) {
      throw error;
    }
  }

  async delete<T = any, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<AxiosResponse<T>> {
    try {
      return await this.axios.delete<T, AxiosResponse<T>, D>(url, config);
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
      return await this.axios.patch<T, AxiosResponse<T>, D>(url, data, config);
    } catch (error: any) {
      throw error;
    }
  }
}

const axiosClient = new AxiosClient();

export default axiosClient;

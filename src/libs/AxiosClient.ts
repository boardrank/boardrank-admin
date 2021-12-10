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

  async get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    try {
      return await this.axios.get(url, config);
    } catch (error: any) {
      throw error;
    }
  }

  post = this.axios.post;
  delete = this.axios.delete;
  patch = this.axios.patch;
}

const axiosClient = new AxiosClient();

export default axiosClient;

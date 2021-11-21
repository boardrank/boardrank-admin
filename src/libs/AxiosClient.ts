import axios from 'axios';

class AxiosClient {
  private axios = axios.create({
    baseURL: 'https://api.boardrank.kr/',
  });

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

  get = this.axios.get;
  post = this.axios.post;
  delete = this.axios.delete;
  patch = this.axios.patch;
}

const axiosClient = new AxiosClient();

export default axiosClient;

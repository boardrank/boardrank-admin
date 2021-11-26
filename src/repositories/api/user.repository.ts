import { ApiGetUserListResData } from '../../../out/typescript/models/ApiGetUserListResData';
import { ApiGetUserResData } from '../../../out/typescript/models/ApiGetUserResData';
import axiosClient from '../../libs/AxiosClient';

export const getUser = () => {
  return axiosClient.get<ApiGetUserResData>('/user');
};

export const getUserList = (page: number, rowsPerPage: number = 10) => {
  return axiosClient.get<ApiGetUserListResData>('/user/list', {
    params: { page, rowsPerPage },
  });
};

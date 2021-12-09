import { ApiGetAdminUserListResData } from '../../../out/typescript/models/ApiGetAdminUserListResData';
import { ApiGetUserResData } from '../../../out/typescript/models/ApiGetUserResData';
import axiosClient from '../../libs/AxiosClient';

export const getUser = () => {
  return axiosClient.get<ApiGetUserResData>('/user');
};

export const getUserList = (
  page: number,
  rowsPerPage: number = 10,
  keyword: string = '',
) => {
  return axiosClient.get<ApiGetAdminUserListResData>('/admin/user/list', {
    params: { page, rowsPerPage, keyword },
  });
};

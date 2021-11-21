import { ApiGetUserResData } from '../../../out/typescript/models/ApiGetUserResData';
import axiosClient from '../../libs/AxiosClient';

export const getUser = () => {
  return axiosClient.get<ApiGetUserResData>('/user');
};

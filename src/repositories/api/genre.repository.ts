import { ApiGetAdminGenreListResData } from '../../../out/typescript/models/ApiGetAdminGenreListResData';
import axiosClient from '../../libs/AxiosClient';

export const getGenreList = () => {
  return axiosClient.get<ApiGetAdminGenreListResData>('/admin/genre/list');
};

import { ApiGetAdminUserListResData } from '../../../out/typescript/models/ApiGetAdminUserListResData';
import { ApiGetUserResData } from '../../../out/typescript/models/ApiGetUserResData';
import { UpdateUserDto } from '../../../out/typescript/models/UpdateUserDto';
import axiosClient from '../../libs/AxiosClient';
import { ApiPatchAdminUserIdReqBody } from '../../../out/typescript/models/ApiPatchAdminUserIdReqBody';
import { ApiPatchAdminUserIdResData } from '../../../out/typescript/models/ApiPatchAdminUserIdResData';
import { ApiDeleteAdminUserIdResData } from '../../../out/typescript/models/ApiDeleteAdminUserIdResData';

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

export const patchUser = async (userId: number, user: UpdateUserDto) => {
  try {
    return await axiosClient.patch<
      ApiPatchAdminUserIdResData,
      ApiPatchAdminUserIdReqBody
    >(`/admin/user/${userId}`, { user });
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId: number) => {
  try {
    return await axiosClient.delete<ApiDeleteAdminUserIdResData>(
      `/admin/user/${userId}`,
    );
  } catch (error) {
    throw error;
  }
};

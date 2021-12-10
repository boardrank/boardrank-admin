import { ApiDeleteAdminGenreIdResData } from '../../../out/typescript/models/ApiDeleteAdminGenreIdResData';
import { ApiGetAdminGenreListResData } from '../../../out/typescript/models/ApiGetAdminGenreListResData';
import { ApiPatchAdminGenreIdReqBody } from '../../../out/typescript/models/ApiPatchAdminGenreIdReqBody';
import { ApiPatchAdminGenreIdResData } from '../../../out/typescript/models/ApiPatchAdminGenreIdResData';
import { ApiPatchAdminGenreRearrangeIdReqBody } from '../../../out/typescript/models/ApiPatchAdminGenreRearrangeIdReqBody';
import { ApiPatchAdminGenreRearrangeIdResData } from '../../../out/typescript/models/ApiPatchAdminGenreRearrangeIdResData';
import { ApiPostAdminGenreReqBody } from '../../../out/typescript/models/ApiPostAdminGenreReqBody';
import { ApiPostAdminGenreResData } from '../../../out/typescript/models/ApiPostAdminGenreResData';
import { CreateGenreDto } from '../../../out/typescript/models/CreateGenreDto';
import { UpdateGenreDto } from '../../../out/typescript/models/UpdateGenreDto';
import axiosClient from '../../libs/AxiosClient';

export const getGenreList = () => {
  return axiosClient.get<ApiGetAdminGenreListResData>('/admin/genre/list');
};

export const postGenre = async (genre: CreateGenreDto) => {
  try {
    return await axiosClient.post<
      ApiPostAdminGenreResData,
      ApiPostAdminGenreReqBody
    >('/admin/genre', { genre });
  } catch (error) {
    throw error;
  }
};

export const patchGenre = async (genreId: number, genre: UpdateGenreDto) => {
  try {
    return await axiosClient.patch<
      ApiPatchAdminGenreIdResData,
      ApiPatchAdminGenreIdReqBody
    >(`/admin/genre/${genreId}`, { genre });
  } catch (error) {
    throw error;
  }
};

export const deleteGenre = async (genreId: number) => {
  try {
    return await axiosClient.delete<ApiDeleteAdminGenreIdResData>(
      `/admin/genre/${genreId}`,
    );
  } catch (error) {
    throw error;
  }
};

export const patchGenreRearrange = async (
  genreId: number,
  source: number,
  destination: number,
) => {
  try {
    return await axiosClient.patch<
      ApiPatchAdminGenreRearrangeIdResData,
      ApiPatchAdminGenreRearrangeIdReqBody
    >(`/admin/genre/rearrange/${genreId}`, {
      source,
      destination,
    });
  } catch (error) {
    throw error;
  }
};

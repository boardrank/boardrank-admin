import { ApiDeleteAdminGenreIdResData } from '../../../out/typescript/models/ApiDeleteAdminGenreIdResData';
import { ApiGetAdminGenreListResData } from '../../../out/typescript/models/ApiGetAdminGenreListResData';
import { ApiPatchAdminGenreIdReqBody } from '../../../out/typescript/models/ApiPatchAdminGenreIdReqBody';
import { ApiPatchAdminGenreIdResData } from '../../../out/typescript/models/ApiPatchAdminGenreIdResData';
import { ApiPostAdminGenreReqBody } from '../../../out/typescript/models/ApiPostAdminGenreReqBody';
import { ApiPostAdminGenreResData } from '../../../out/typescript/models/ApiPostAdminGenreResData';
import { AxiosResponse } from 'axios';
import { CreateGenreDto } from '../../../out/typescript/models/CreateGenreDto';
import { UpdateGenreDto } from '../../../out/typescript/models/UpdateGenreDto';
import axiosClient from '../../libs/AxiosClient';

export const getGenreList = () => {
  return axiosClient.get<ApiGetAdminGenreListResData>('/admin/genre/list');
};

export const postGenre = (genre: CreateGenreDto) => {
  return axiosClient.post<
    ApiPostAdminGenreResData,
    AxiosResponse<ApiPostAdminGenreResData>,
    ApiPostAdminGenreReqBody
  >('/damin/genre', { genre });
};

export const patchGenre = (genreId: number, genre: UpdateGenreDto) => {
  return axiosClient.patch<
    ApiPatchAdminGenreIdResData,
    AxiosResponse<ApiPatchAdminGenreIdResData>,
    ApiPatchAdminGenreIdReqBody
  >(`/damin/genre/${genreId}`, { genre });
};

export const deleteGenre = (genreId: number) => {
  return axiosClient.delete<ApiDeleteAdminGenreIdResData>(
    `/damin/genre/${genreId}`,
  );
};

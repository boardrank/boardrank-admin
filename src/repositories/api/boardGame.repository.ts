import {
  CreateBoardGameDto,
  UpdateBoardGameDto,
} from '../../../out/typescript';
import { ApiGetAdminBoardGameListResData } from '../../../out/typescript/models/ApiGetAdminBoardGameListResData';
import axiosClient from '../../libs/AxiosClient';
import { ApiPostAdminBoardGameReqBody } from '../../../out/typescript/models/ApiPostAdminBoardGameReqBody';
import { ApiPostAdminBoardGameResData } from '../../../out/typescript/models/ApiPostAdminBoardGameResData';
import { ApiPatchAdminBoardGameIdReqBody } from '../../../out/typescript/models/ApiPatchAdminBoardGameIdReqBody';
import { ApiPatchAdminBoardGameIdResData } from '../../../out/typescript/models/ApiPatchAdminBoardGameIdResData';
import { ApiDeleteAdminBoardGameIdResData } from '../../../out/typescript/models/ApiDeleteAdminBoardGameIdResData';

export const getBoardGameList = async (
  page: number,
  rowsPerPage: number = 10,
  keyword: string = '',
) => {
  try {
    return await axiosClient.get<ApiGetAdminBoardGameListResData>(
      '/admin/board-game/list',
      { params: { page, rowsPerPage, keyword } },
    );
  } catch (error) {
    throw error;
  }
};

export const postBoardGame = async (boardGame: CreateBoardGameDto) => {
  try {
    return await axiosClient.post<
      ApiPostAdminBoardGameResData,
      ApiPostAdminBoardGameReqBody
    >('/admin/board-game', { boardGame });
  } catch (error) {
    throw error;
  }
};

export const patchBoardGame = async (
  boardGameId: number,
  boardGame: UpdateBoardGameDto,
) => {
  try {
    return await axiosClient.patch<
      ApiPatchAdminBoardGameIdResData,
      ApiPatchAdminBoardGameIdReqBody
    >(`/admin/board-game/${boardGameId}`, { boardGame });
  } catch (error) {
    throw error;
  }
};

export const deleteBoardGame = async (boardGameId: number) => {
  try {
    return await axiosClient.delete<ApiDeleteAdminBoardGameIdResData>(
      `/admin/board-game/${boardGameId}`,
    );
  } catch (error) {
    throw error;
  }
};

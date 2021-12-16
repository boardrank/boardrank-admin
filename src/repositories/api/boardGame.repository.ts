import {
  ApiGetAdminBoardGameIdResData,
  CreateBoardGameDto,
  UpdateBoardGameDto,
} from '../../../out/typescript';

import { ApiDeleteAdminBoardGameIdResData } from '../../../out/typescript/models/ApiDeleteAdminBoardGameIdResData';
import { ApiGetAdminBoardGameListResData } from '../../../out/typescript/models/ApiGetAdminBoardGameListResData';
import { ApiPatchAdminBoardGameIdResData } from '../../../out/typescript/models/ApiPatchAdminBoardGameIdResData';
import { ApiPostAdminBoardGameResData } from '../../../out/typescript/models/ApiPostAdminBoardGameResData';
import axiosClient from '../../libs/AxiosClient';

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

export const getBoardGameById = async (boardGameId: number) => {
  try {
    return await axiosClient.get<ApiGetAdminBoardGameIdResData>(
      `/admin/board-game/${boardGameId}`,
    );
  } catch (error) {
    throw error;
  }
};

export const postBoardGame = async (
  boardGame: CreateBoardGameDto,
  file: File | Blob,
) => {
  try {
    const formData = new FormData();
    formData.append('boardGame', JSON.stringify(boardGame));
    formData.append('file', file);

    return await axiosClient.post<ApiPostAdminBoardGameResData>(
      '/admin/board-game',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  } catch (error) {
    throw error;
  }
};

export const patchBoardGame = async (
  boardGameId: number,
  boardGame: UpdateBoardGameDto,
  file?: File | Blob,
) => {
  try {
    const formData = new FormData();
    formData.append('boardGame', JSON.stringify(boardGame));
    if (file) formData.append('file', file);
    return await axiosClient.patch<ApiPatchAdminBoardGameIdResData>(
      `/admin/board-game/${boardGameId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
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

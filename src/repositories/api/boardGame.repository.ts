import { ApiGetAdminBoardGameListResData } from '../../../out/typescript/models/ApiGetAdminBoardGameListResData';
import axiosClient from '../../libs/AxiosClient';

export const getBoardGameList = (
  page: number,
  rowsPerPage: number = 10,
  keyword: string = '',
) => {
  return axiosClient.get<ApiGetAdminBoardGameListResData>(
    '/admin/board-game/list',
    {
      params: { page, rowsPerPage, keyword },
    },
  );
};

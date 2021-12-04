import { ApiGetBoardGameListResData } from '../../../out/typescript/models/ApiGetBoardGameListResData';
import axiosClient from '../../libs/AxiosClient';

export const getBoardGameList = (
  page: number,
  rowsPerPage: number = 10,
  keyword: string = '',
) => {
  return axiosClient.get<ApiGetBoardGameListResData>('/board-game/list', {
    params: { page, rowsPerPage, keyword },
  });
};

import { ApiGetAdminBoardGameListResData } from '../../../out/typescript/models/ApiGetAdminBoardGameListResData';
import { boardGameListPageState } from './boardGameListPageState.recoil';
import { getBoardGameList } from '../api/boardGame.repository';
import { selector } from 'recoil';

const BoardGameListStateKey = 'BoardGameListState';

export const boardGameListState = selector<ApiGetAdminBoardGameListResData>({
  key: BoardGameListStateKey,
  get: async ({ get }) => {
    const { page, rowsPerPage, keyword } = get(boardGameListPageState);
    const res = await getBoardGameList(page, rowsPerPage, keyword);

    return res.data;
  },
});

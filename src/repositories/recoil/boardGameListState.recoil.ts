import { ApiGetBoardGameListResData } from '../../../out/typescript/models/ApiGetBoardGameListResData';
import { boardGameListPageState } from './boardGameListPageState.recoil';
import { getBoardGameList } from '../api/boardGame.repository';
import { selector } from 'recoil';

const BoardGameListStateKey = 'BoardGameListState';

export const boardGameListState = selector<ApiGetBoardGameListResData>({
  key: BoardGameListStateKey,
  get: async ({ get }) => {
    const { page, rowsPerPage, keyword } = get(boardGameListPageState);
    const res = await getBoardGameList(page, rowsPerPage, keyword);

    return res.data;
  },
});

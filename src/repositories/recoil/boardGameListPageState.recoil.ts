import { atom } from 'recoil';

const BoardGameListPageStateKey = 'BoardGameListPageState';

export interface BoardGameListPage {
  page: number;
  rowsPerPage: number;
  keyword: string;
  requestId: number;
}

export const boardGameListPageState = atom<BoardGameListPage>({
  key: BoardGameListPageStateKey,
  default: { page: 1, rowsPerPage: 10, keyword: '', requestId: 0 },
});

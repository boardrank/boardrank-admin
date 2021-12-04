import { atom } from 'recoil';

const BoardGameListPageStateKey = 'BoardGameListPageState';

export interface BoardGameListPage {
  page: number;
  rowsPerPage: number;
  keyword: string;
}

export const boardGameListPageState = atom<BoardGameListPage>({
  key: BoardGameListPageStateKey,
  default: { page: 1, rowsPerPage: 10, keyword: '' },
});

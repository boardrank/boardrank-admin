import { useRecoilState, useRecoilValueLoadable } from 'recoil';

import { AdminBoardGameListItem } from '../../../out/typescript';
import { ApiGetAdminBoardGameListResData } from '../../../out/typescript/models/ApiGetAdminBoardGameListResData';
import { boardGameListPageState } from '../../repositories/recoil/boardGameListPageState.recoil';
import { boardGameListState } from '../../repositories/recoil/boardGameListState.recoil';
import { useCallback } from 'react';

interface BoardGameList {
  boardGames: AdminBoardGameListItem[];
  totalCount: number;
}

interface BoardGameListUseCase {
  boardGameList: BoardGameList;
  isLoading: boolean;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  setKeyword: (keyword: string) => void;
  reset: () => void;
}

export const useBoardGameListUseCase = (): BoardGameListUseCase => {
  const [boardGameListPage, setBoardGameListPage] = useRecoilState(
    boardGameListPageState,
  );
  const boardGameList =
    useRecoilValueLoadable<ApiGetAdminBoardGameListResData>(boardGameListState);

  const setPage = useCallback(
    (page: number) => {
      setBoardGameListPage({ ...boardGameListPage, page });
    },
    [setBoardGameListPage, boardGameListPage],
  );

  const setRowsPerPage = useCallback(
    (rowsPerPage: number) => {
      setBoardGameListPage({ ...boardGameListPage, rowsPerPage, page: 1 });
    },
    [setBoardGameListPage, boardGameListPage],
  );

  const setKeyword = useCallback(
    (keyword: string) => {
      setBoardGameListPage({ ...boardGameListPage, keyword, page: 1 });
    },
    [setBoardGameListPage, boardGameListPage],
  );

  const reset = useCallback(() => {
    setBoardGameListPage({
      ...boardGameListPage,
      page: 1,
      keyword: '',
      requestId: boardGameListPage.requestId + 1,
    });
  }, [boardGameListPage, setBoardGameListPage]);

  return {
    boardGameList:
      boardGameList.state === 'hasValue'
        ? boardGameList.contents
        : { boardGames: [], totalCount: 0 },
    isLoading: boardGameList.state === 'loading',
    setPage,
    setRowsPerPage,
    setKeyword,
    reset,
  };
};

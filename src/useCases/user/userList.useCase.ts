import { useRecoilState, useRecoilValueLoadable } from 'recoil';

import { ApiGetUserListResData } from '../../../out/typescript/models/ApiGetUserListResData';
import { UserListItem } from '../../../out/typescript/models/UserListItem';
import { useCallback } from 'react';
import { userListPageState } from '../../repositories/recoil/userListPageState.recoil';
import { userListState } from '../../repositories/recoil/userListState.recoil';

interface UserList {
  users: UserListItem[];
  totalCount: number;
}

interface UserListUseCase {
  userList: UserList;
  isLoading: boolean;
  setPage: (page: number) => void;
  setRowsPerPage: (rowsPerPage: number) => void;
  setKeyword: (keyword: string) => void;
}

export const useUserListUseCase = (): UserListUseCase => {
  const [userListPage, setUserListPage] = useRecoilState(userListPageState);
  const userList = useRecoilValueLoadable<ApiGetUserListResData>(userListState);

  const setPage = useCallback(
    (page: number) => {
      setUserListPage({ ...userListPage, page });
    },
    [setUserListPage, userListPage],
  );

  const setRowsPerPage = useCallback(
    (rowsPerPage: number) => {
      setUserListPage({ ...userListPage, rowsPerPage, page: 1 });
    },
    [setUserListPage, userListPage],
  );

  const setKeyword = useCallback(
    (keyword: string) => {
      setUserListPage({ ...userListPage, keyword, page: 1 });
    },
    [setUserListPage, userListPage],
  );

  return {
    userList:
      userList.state === 'hasValue'
        ? userList.contents
        : { users: [], totalCount: 0 },
    isLoading: userList.state === 'loading',
    setPage,
    setRowsPerPage,
    setKeyword,
  };
};

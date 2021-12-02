import { atom } from 'recoil';

const UserListPageStateKey = 'UserListPageState';

export interface UserListPage {
  page: number;
  rowsPerPage: number;
  keyword: string;
}

export const userListPageState = atom<UserListPage>({
  key: UserListPageStateKey,
  default: { page: 1, rowsPerPage: 10, keyword: '' },
});

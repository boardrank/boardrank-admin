import { atom } from 'recoil';

const UserListPageStateKey = 'UserListPageState';

interface UserListPage {
  page: number;
  rowsPerPage: number;
}

export const userListPageState = atom<UserListPage>({
  key: UserListPageStateKey,
  default: { page: 1, rowsPerPage: 10 },
});

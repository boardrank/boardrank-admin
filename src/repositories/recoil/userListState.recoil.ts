import { ApiGetAdminUserListResData } from '../../../out/typescript/models/ApiGetAdminUserListResData';
import { getUserList } from '../api/user.repository';
import { selector } from 'recoil';
import { userListPageState } from './userListPageState.recoil';

const UserListStateKey = 'UserListState';

export const userListState = selector<ApiGetAdminUserListResData>({
  key: UserListStateKey,
  get: async ({ get }) => {
    const { page, rowsPerPage, keyword } = get(userListPageState);
    const res = await getUserList(page, rowsPerPage, keyword);

    return res.data;
  },
});

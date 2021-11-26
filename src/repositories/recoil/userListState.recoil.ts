import { ApiGetUserListResData } from '../../../out/typescript/models/ApiGetUserListResData';
import { getUserList } from '../api/user.repository';
import { selector } from 'recoil';
import { userListPageState } from './userListPageState.recoil';

const UserListStateKey = 'UserListState';

export const userListState = selector<ApiGetUserListResData>({
  key: UserListStateKey,
  get: async ({ get }) => {
    // const { accessToken } = get(authTokenState);

    // if (!accessToken) return { users: [], totalCount: 0 };

    const { page, rowsPerPage } = get(userListPageState);
    const res = await getUserList(page, rowsPerPage);

    return res.data;
  },
});

import { User } from '../../../out/typescript/models/User';
import { getUser } from '../api/user.repository';
import { selector } from 'recoil';
import { UserRequestIdState } from './userRequestIdState.recoil';
import { getAccessToken } from '../localStorage/auth.repository';

const UserStateKey = 'UserState';

export const userState = selector<User | null>({
  key: UserStateKey,
  get: async ({ get }) => {
    get(UserRequestIdState);
    if (!getAccessToken()) return null;
    try {
      const res = await getUser();
      return res.data.user;
    } catch (error) {
      return null;
    }
  },
});

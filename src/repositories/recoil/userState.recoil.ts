import { User } from '../../../out/typescript/models/User';
import { authTokenState } from './authTokenState.recoil';
import { getUser } from '../api/user.repository';
import { selector } from 'recoil';

const UserStateKey = 'UserState';

export const userState = selector<User | null>({
  key: UserStateKey,
  get: async ({ get }) => {
    const { accessToken } = get(authTokenState);
    if (accessToken === '') return null;
    const res = await getUser();
    return res.data.user;
  },
});

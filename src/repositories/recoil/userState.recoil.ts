import { User } from '../../../out/typescript/models/User';
import { getUser } from '../api/user.repository';
import { selector } from 'recoil';
import { UserRequestIdState } from './userRequestIdState.recoil';

const UserStateKey = 'UserState';

export const userState = selector<User | null>({
  key: UserStateKey,
  get: async ({ get }) => {
    get(UserRequestIdState);
    try {
      const res = await getUser();
      return res.data.user;
    } catch (error) {
      return null;
    }
  },
});

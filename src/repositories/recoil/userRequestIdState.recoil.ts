import { atom } from 'recoil';

const UserRequestIdStateKey = 'UserRequestIdState';

export const UserRequestIdState = atom<number>({
  key: UserRequestIdStateKey,
  default: 0,
});

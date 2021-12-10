import { atom } from 'recoil';

const GenreListRequestIDStateKey = 'GenreListRequestIDState';

export const GenreListRequestIDState = atom<number>({
  key: GenreListRequestIDStateKey,
  default: 0,
});

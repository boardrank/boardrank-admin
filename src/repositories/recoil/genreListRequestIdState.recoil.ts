import { atom } from 'recoil';

const GenreListRequestIdStateKey = 'GenreListRequestIdState';

export const GenreListRequestIdState = atom<number>({
  key: GenreListRequestIdStateKey,
  default: 0,
});

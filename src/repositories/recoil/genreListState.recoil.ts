import { ApiGetAdminGenreListResData } from '../../../out/typescript/models/ApiGetAdminGenreListResData';
import { GenreListRequestIdState } from './genreListRequestIdState.recoil';
import { getGenreList } from '../api/genre.repository';
import { selector } from 'recoil';

const GenreListStateKey = 'GenreListState';

export const GenreListState = selector<ApiGetAdminGenreListResData>({
  key: GenreListStateKey,
  get: async ({ get }) => {
    get(GenreListRequestIdState);
    const res = await getGenreList();
    return res.data;
  },
});

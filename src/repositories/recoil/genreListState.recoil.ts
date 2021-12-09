import { ApiGetAdminGenreListResData } from '../../../out/typescript/models/ApiGetAdminGenreListResData';
import { getGenreList } from '../api/genre.repository';
import { selector } from 'recoil';

const GenreListStateKey = 'GenreListState';

export const GenreListState = selector<ApiGetAdminGenreListResData>({
  key: GenreListStateKey,
  get: async () => {
    const res = await getGenreList();

    return res.data;
  },
});

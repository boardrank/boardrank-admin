import { ApiGetAdminGenreListResData } from '../../../out/typescript/models/ApiGetAdminGenreListResData';
import { Genre } from '../../../out/typescript/models/Genre';
import { GenreListState } from '../../repositories/recoil/genreListState.recoil';
import { useRecoilValueLoadable } from 'recoil';

interface GenreList {
  genres: Genre[];
  // totalCount: number;
}

interface GenreListUseCase {
  genreList: GenreList;
  isLoading: boolean;
}

export const useGenreListUseCase = (): GenreListUseCase => {
  const genreList =
    useRecoilValueLoadable<ApiGetAdminGenreListResData>(GenreListState);

  return {
    genreList:
      genreList.state === 'hasValue' ? genreList.contents : { genres: [] },
    isLoading: genreList.state === 'loading',
  };
};

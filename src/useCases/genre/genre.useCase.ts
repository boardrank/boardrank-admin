import {
  deleteGenre,
  patchGenre,
  postGenre,
} from '../../repositories/api/genre.repository';

import { ApiDeleteAdminGenreIdResData } from '../../../out/typescript/models/ApiDeleteAdminGenreIdResData';
import { ApiPatchAdminGenreIdResData } from '../../../out/typescript/models/ApiPatchAdminGenreIdResData';
import { ApiPostAdminGenreResData } from '../../../out/typescript/models/ApiPostAdminGenreResData';
import { CreateGenreDto } from '../../../out/typescript/models/CreateGenreDto';
import { GenreListRequestIdState } from '../../repositories/recoil/genreListRequestIdState.recoil';
import { UpdateGenreDto } from '../../../out/typescript/models/UpdateGenreDto';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

export interface GenreUseCase {
  createGenre: (genre: CreateGenreDto) => Promise<ApiPostAdminGenreResData>;
  updateGenre: (
    genreId: number,
    genre: UpdateGenreDto,
  ) => Promise<ApiPatchAdminGenreIdResData>;
  removeGenre: (genreId: number) => Promise<ApiDeleteAdminGenreIdResData>;
}

export const useGenreUseCase = (): GenreUseCase => {
  const [genreListRequestId, setGenreListRequestId] = useRecoilState(
    GenreListRequestIdState,
  );

  const createGenre = useCallback(
    async (genre: CreateGenreDto) => {
      const res = await postGenre(genre);

      setGenreListRequestId(genreListRequestId + 1);

      return res.data;
    },
    [genreListRequestId, setGenreListRequestId],
  );

  const updateGenre = useCallback(
    async (genreId: number, genre: UpdateGenreDto) => {
      const res = await patchGenre(genreId, genre);

      setGenreListRequestId(genreListRequestId + 1);

      return res.data;
    },
    [genreListRequestId, setGenreListRequestId],
  );

  const removeGenre = useCallback(
    async (genreId: number) => {
      const res = await deleteGenre(genreId);

      setGenreListRequestId(genreListRequestId + 1);

      return res.data;
    },
    [genreListRequestId, setGenreListRequestId],
  );

  return {
    createGenre,
    updateGenre,
    removeGenre,
  };
};

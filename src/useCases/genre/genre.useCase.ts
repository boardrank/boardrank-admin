import {
  deleteGenre,
  patchGenre,
  patchGenreRearrange,
  postGenre,
} from '../../repositories/api/genre.repository';

import { ApiDeleteAdminGenreIdResData } from '../../../out/typescript/models/ApiDeleteAdminGenreIdResData';
import { ApiPatchAdminGenreIdResData } from '../../../out/typescript/models/ApiPatchAdminGenreIdResData';
import { ApiPatchAdminGenreRearrangeIdResData } from '../../../out/typescript/models/ApiPatchAdminGenreRearrangeIdResData';
import { ApiPostAdminGenreResData } from '../../../out/typescript/models/ApiPostAdminGenreResData';
import { CreateGenreDto } from '../../../out/typescript/models/CreateGenreDto';
import { UpdateGenreDto } from '../../../out/typescript/models/UpdateGenreDto';
import { useCallback } from 'react';

export interface GenreUseCase {
  createGenre: (genre: CreateGenreDto) => Promise<ApiPostAdminGenreResData>;
  updateGenre: (
    genreId: number,
    genre: UpdateGenreDto,
  ) => Promise<ApiPatchAdminGenreIdResData>;
  removeGenre: (genreId: number) => Promise<ApiDeleteAdminGenreIdResData>;
  rearrangeGenre: (
    genreId: number,
    source: number,
    destination: number,
  ) => Promise<ApiPatchAdminGenreRearrangeIdResData>;
}

export const useGenreUseCase = (): GenreUseCase => {
  const createGenre = useCallback(async (genre: CreateGenreDto) => {
    const res = await postGenre(genre);

    return res.data;
  }, []);

  const updateGenre = useCallback(
    async (genreId: number, genre: UpdateGenreDto) => {
      const res = await patchGenre(genreId, genre);

      return res.data;
    },
    [],
  );

  const removeGenre = useCallback(async (genreId: number) => {
    const res = await deleteGenre(genreId);

    return res.data;
  }, []);

  const rearrangeGenre = useCallback(
    async (genreId: number, source: number, destination: number) => {
      const res = await patchGenreRearrange(genreId, source, destination);

      return res.data;
    },
    [],
  );

  return {
    createGenre,
    updateGenre,
    removeGenre,
    rearrangeGenre,
  };
};

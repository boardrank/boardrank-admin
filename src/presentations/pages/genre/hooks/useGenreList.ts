import { useEffect, useState } from 'react';

import { useGenreListUseCase } from '../../../../useCases/genre/genreList.useCase';
import { useGenreUseCase } from '../../../../useCases/genre/genre.useCase';

export const useGenreList = () => {
  const { genreList, isLoading } = useGenreListUseCase();
  const { createGenre, updateGenre, removeGenre } = useGenreUseCase();

  const [list, setList] = useState(genreList);

  useEffect(() => {
    if (!isLoading) {
      setList(genreList);
    }
  }, [isLoading, genreList]);

  return {
    genreList: list,
    isLoading,
  };
};

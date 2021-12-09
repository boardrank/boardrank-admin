import { useEffect, useState } from 'react';

import { useGenreListUseCase } from '../../../../useCases/genre/genreList.useCase';

export const useGenreList = () => {
  const { genreList, isLoading } = useGenreListUseCase();

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

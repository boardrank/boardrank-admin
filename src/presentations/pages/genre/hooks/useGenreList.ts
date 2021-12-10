import { DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { useCallback, useEffect, useState } from 'react';

import { Genre } from '../../../../../out/typescript/models/Genre';
import { GenreListRequestIDState } from '../../../../repositories/recoil/genreListRequestIdState.recoil';
import { useGenreListUseCase } from '../../../../useCases/genre/genreList.useCase';
import { useGenreUseCase } from '../../../../useCases/genre/genre.useCase';
import { useRecoilState } from 'recoil';

const copyGenre = (genres: Genre[], index: number) => {
  return {
    ...genres[index],
    order: index + 1,
  };
};

export const useGenreList = () => {
  const { genreList, isLoading } = useGenreListUseCase();
  const { createGenre, updateGenre, removeGenre } = useGenreUseCase();

  const [genres, setGenres] = useState(genreList.genres);
  const { rearrangeGenre } = useGenreUseCase();
  const [genreListRequestId, setGenreListRequestId] = useRecoilState(
    GenreListRequestIDState,
  );

  /**
   * 삭제 이벤트 핸들러
   */
  const handleClickRemove = useCallback(
    async (genreId: number) => {
      try {
        const { genre } = await removeGenre(genreId);
        setGenres(genres.filter(({ id }) => id !== genre.id));
      } catch (error) {
        throw error;
      }
    },
    [genres, removeGenre],
  );

  /**
   * 순서 변경 이벤트 핸들러
   */
  const handleChangeOrder = useCallback(
    async (
      { destination, source }: DropResult,
      provided: ResponderProvided,
    ) => {
      if (!destination || destination.index === source.index) return;
      const newGenres = Array.from({ length: genres.length }) as Genre[];
      let diff = 0;
      for (let i = 0; i < genres.length; i++) {
        if (i === destination.index) {
          diff--;
          newGenres[i] = copyGenre(genres, source.index);
        } else if (i === source.index) {
          if (destination.index > source.index) {
            newGenres[i] = copyGenre(genres, i + ++diff);
          } else {
            newGenres[i] = copyGenre(genres, i + diff++);
          }
        } else {
          newGenres[i] = copyGenre(genres, i + diff);
        }
      }
      setGenres(newGenres);

      try {
        const sourceGenre = genres[source.index];
        const destinationGenre = genres[destination.index];

        const { genres: rearrangedGenres } = await rearrangeGenre(
          sourceGenre.id,
          sourceGenre.order,
          destinationGenre.order,
        );

        setGenres(rearrangedGenres);
      } catch (error) {
        setGenreListRequestId(genreListRequestId + 1);
      }
    },
    [genreListRequestId, genres, rearrangeGenre, setGenreListRequestId],
  );

  useEffect(() => {
    if (!isLoading) {
      setGenres(genreList.genres);
    }
  }, [isLoading, genreList]);

  return {
    genres,
    isLoading,
    createGenre,
    updateGenre,
    handleClickRemove,
    handleChangeOrder,
  };
};

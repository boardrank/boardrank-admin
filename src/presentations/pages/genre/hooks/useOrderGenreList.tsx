import { DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { useCallback, useEffect, useState } from 'react';

import { Genre } from '../../../../../out/typescript/models/Genre';
import { GenreList } from '../../../../useCases/genre/genreList.useCase';

export interface OrderGenreListProps {
  genreList: GenreList;
}

const copyGenre = (genres: Genre[], index: number) => {
  return {
    ...genres[index],
    order: index + 1,
  };
};

export const useOrderGenreList = ({ genreList }: OrderGenreListProps) => {
  const [genres, setGenres] = useState<Genre[]>(genreList.genres);

  const handleChangeOrder = useCallback(
    ({ destination, source }: DropResult, provided: ResponderProvided) => {
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
    },
    [genres],
  );

  useEffect(() => {
    setGenres(genreList.genres);
  }, [genreList.genres]);

  return {
    genres,
    handleChangeOrder,
  };
};

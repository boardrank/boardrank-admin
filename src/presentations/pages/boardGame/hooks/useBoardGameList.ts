import { useEffect, useState } from 'react';

import { useBoardGameListUseCase } from '../../../../useCases/boardGame/boardGameList.useCase';

export const useBoardGameList = () => {
  const { boardGameList, isLoading, ...others } = useBoardGameListUseCase();

  const [list, setList] = useState(boardGameList);

  useEffect(() => {
    if (!isLoading) {
      setList(boardGameList);
    }
  }, [isLoading, boardGameList]);

  return {
    boardGameList: list,
    isLoading,
    ...others,
  };
};

import { useCallback, useEffect, useState } from 'react';
import {
  CreateBoardGameDto,
  UpdateBoardGameDto,
} from '../../../../../out/typescript';
import { useBoardGameUseCase } from '../../../../useCases/boardGame/boardGame.useCase';

import { useBoardGameListUseCase } from '../../../../useCases/boardGame/boardGameList.useCase';

export const useBoardGameList = () => {
  const { boardGameList, isLoading, reset, ...others } =
    useBoardGameListUseCase();
  const { createBoardGame, updateBoardGame, removeBoardGame } =
    useBoardGameUseCase();

  const [list, setList] = useState(boardGameList);

  /**
   * 추가 이벤트 핸들러
   */
  const handleAddBoardGame = useCallback(
    async (newBoardGame: CreateBoardGameDto) => {
      try {
        await createBoardGame(newBoardGame);
        reset();
      } catch (error) {
        throw error;
      }
    },
    [createBoardGame, reset],
  );

  /**
   * 업데이트 이벤트 핸들러
   */
  const handleUpdateBoardGame = useCallback(
    async (BoardGameId: number, newBoardGame: UpdateBoardGameDto) => {
      try {
        const { boardGame } = await updateBoardGame(BoardGameId, newBoardGame);
        setList({
          ...list,
          boardGames: list.boardGames.map(prevBoardGame =>
            prevBoardGame.id === boardGame.id
              ? { ...prevBoardGame, ...boardGame }
              : prevBoardGame,
          ),
        });
      } catch (error) {
        throw error;
      }
    },
    [updateBoardGame, list],
  );

  /**
   * 삭제 이벤트 핸들러
   */
  const handleRemoveBoardGame = useCallback(
    async (BoardGameId: number) => {
      try {
        await removeBoardGame(BoardGameId);
        reset();
      } catch (error) {
        throw error;
      }
    },
    [removeBoardGame, reset],
  );

  useEffect(() => {
    if (!isLoading) {
      setList(boardGameList);
    }
  }, [isLoading, boardGameList]);

  return {
    boardGameList: list,
    isLoading,
    ...others,
    handleAddBoardGame,
    handleUpdateBoardGame,
    handleRemoveBoardGame,
  };
};

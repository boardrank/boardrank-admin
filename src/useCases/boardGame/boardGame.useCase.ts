import {
  ApiDeleteAdminBoardGameIdResData,
  ApiPatchAdminBoardGameIdResData,
  ApiPostAdminBoardGameResData,
  CreateBoardGameDto,
  UpdateBoardGameDto,
} from '../../../out/typescript';
import {
  deleteBoardGame,
  patchBoardGame,
  postBoardGame,
} from '../../repositories/api/boardGame.repository';

import { useCallback } from 'react';

export interface BoardGameUseCase {
  createBoardGame: (
    boardGame: CreateBoardGameDto,
  ) => Promise<ApiPostAdminBoardGameResData>;
  updateBoardGame: (
    boardGameId: number,
    boardGame: UpdateBoardGameDto,
  ) => Promise<ApiPatchAdminBoardGameIdResData>;
  removeBoardGame: (
    boardGameId: number,
  ) => Promise<ApiDeleteAdminBoardGameIdResData>;
}

export const useBoardGameUseCase = () => {
  const createBoardGame = useCallback(
    async (boardGame: CreateBoardGameDto, file: File | Blob) => {
      try {
        const res = await postBoardGame(boardGame, file);

        return res.data;
      } catch (error) {
        throw error;
      }
    },
    [],
  );

  const updateBoardGame = useCallback(
    async (
      boardGameId: number,
      boardGame: UpdateBoardGameDto,
      file?: File | Blob,
    ) => {
      try {
        const res = await patchBoardGame(boardGameId, boardGame, file);

        return res.data;
      } catch (error) {
        throw error;
      }
    },
    [],
  );

  const removeBoardGame = useCallback(async (boardGameId: number) => {
    const res = await deleteBoardGame(boardGameId);

    return res.data;
  }, []);

  return {
    createBoardGame,
    updateBoardGame,
    removeBoardGame,
  };
};

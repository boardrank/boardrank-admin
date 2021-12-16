import * as boardGameRepository from '../../repositories/api/boardGame.repository';

import {
  ApiDeleteAdminBoardGameIdResData,
  ApiPatchAdminBoardGameIdResData,
  ApiPostAdminBoardGameResData,
  CreateBoardGameDto,
  UpdateBoardGameDto,
} from '../../../out/typescript';

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
        const res = await boardGameRepository.postBoardGame(boardGame, file);

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
        const res = await boardGameRepository.patchBoardGame(
          boardGameId,
          boardGame,
          file,
        );

        return res.data;
      } catch (error) {
        throw error;
      }
    },
    [],
  );

  const removeBoardGame = useCallback(async (boardGameId: number) => {
    try {
      const res = await boardGameRepository.deleteBoardGame(boardGameId);

      return res.data;
    } catch (error) {
      throw error;
    }
  }, []);

  const getBoardGameById = useCallback(async (boardGameId: number) => {
    try {
      const res = await boardGameRepository.getBoardGameById(boardGameId);

      return res.data;
    } catch (error) {
      throw error;
    }
  }, []);

  return {
    createBoardGame,
    updateBoardGame,
    removeBoardGame,
    getBoardGameById,
  };
};

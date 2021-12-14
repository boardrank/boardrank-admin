import { useCallback } from 'react';
import { UpdateUserDto } from '../../../out/typescript';
import { ApiDeleteAdminUserIdResData } from '../../../out/typescript/models/ApiDeleteAdminUserIdResData';
import { ApiPatchAdminUserIdResData } from '../../../out/typescript/models/ApiPatchAdminUserIdResData';
import { deleteUser, patchUser } from '../../repositories/api/user.repository';

export interface UserUseCase {
  updateUser: (
    userId: number,
    user: UpdateUserDto,
  ) => Promise<ApiPatchAdminUserIdResData>;
  removeUser: (userId: number) => Promise<ApiDeleteAdminUserIdResData>;
}

export const useUserUseCase = (): UserUseCase => {
  const updateUser = useCallback(
    async (userId: number, user: UpdateUserDto) => {
      try {
        const res = await patchUser(userId, user);

        return res.data;
      } catch (error) {
        throw error;
      }
    },
    [],
  );

  const removeUser = useCallback(async (userId: number) => {
    try {
      const res = await deleteUser(userId);

      return res.data;
    } catch (error) {
      throw error;
    }
  }, []);

  return {
    updateUser,
    removeUser,
  };
};

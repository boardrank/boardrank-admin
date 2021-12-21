import { useCallback } from 'react';
import { ApiPatchUserResData, UpdateUserDto } from '../../../out/typescript';
import { ApiDeleteAdminUserIdResData } from '../../../out/typescript/models/ApiDeleteAdminUserIdResData';
import { ApiPatchAdminUserIdResData } from '../../../out/typescript/models/ApiPatchAdminUserIdResData';
import {
  deleteAdminUserId,
  patchAdminUserId,
  patchUser,
} from '../../repositories/api/user.repository';

export interface UserUseCase {
  updateUser: (
    userId: number,
    user: UpdateUserDto,
  ) => Promise<ApiPatchAdminUserIdResData>;
  removeUser: (userId: number) => Promise<ApiDeleteAdminUserIdResData>;
  updateProfile: (
    user: UpdateUserDto,
    file?: File | Blob,
  ) => Promise<ApiPatchUserResData>;
}

export const useUserUseCase = (): UserUseCase => {
  const updateProfile = useCallback(
    async (user: UpdateUserDto, file?: File | Blob) => {
      try {
        const res = await patchUser(user, file);

        return res.data;
      } catch (error) {
        throw error;
      }
    },
    [],
  );

  const updateUser = useCallback(
    async (userId: number, user: UpdateUserDto) => {
      try {
        const res = await patchAdminUserId(userId, user);

        return res.data;
      } catch (error) {
        throw error;
      }
    },
    [],
  );

  const removeUser = useCallback(async (userId: number) => {
    try {
      const res = await deleteAdminUserId(userId);

      return res.data;
    } catch (error) {
      throw error;
    }
  }, []);

  return {
    updateUser,
    removeUser,
    updateProfile,
  };
};

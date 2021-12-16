import { useCallback, useEffect, useState } from 'react';

import { UpdateUserDto } from '../../../../../out/typescript';
import { useUserListUseCase } from '../../../../useCases/user/userList.useCase';
import { useUserUseCase } from '../../../../useCases/user/user.useCase';

export const useUserList = () => {
  const { userList, isLoading, ...others } = useUserListUseCase();
  const { updateUser, removeUser } = useUserUseCase();

  const [list, setList] = useState(userList);

  /**
   * 업데이트 이벤트 핸들러
   */
  const handleUpdateUser = useCallback(
    async (userId: number, newUser: UpdateUserDto) => {
      try {
        const { user } = await updateUser(userId, newUser);
        setList({
          ...list,
          users: list.users.map(prevUser =>
            prevUser.id === user.id ? { ...prevUser, ...user } : prevUser,
          ),
        });
      } catch (error) {
        throw error;
      }
    },
    [updateUser, list],
  );

  /**
   * 삭제 이벤트 핸들러
   */
  const handleRemoveUser = useCallback(
    async (userId: number) => {
      try {
        const { user } = await removeUser(userId);
        setList({
          ...list,
          users: list.users.map(prevUser =>
            prevUser.id === user.id ? { ...prevUser, ...user } : prevUser,
          ),
        });
      } catch (error) {
        throw error;
      }
    },
    [list, removeUser],
  );

  useEffect(() => {
    if (!isLoading) {
      setList(userList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return {
    userList: list,
    isLoading,
    handleUpdateUser,
    handleRemoveUser,
    ...others,
  };
};

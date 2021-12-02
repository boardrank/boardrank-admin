import { useEffect, useState } from 'react';

import { useUserListUseCase } from '../../../../useCases/user/userList.useCase';

export const useUserList = () => {
  const { userList, isLoading, setPage, setRowsPerPage, setKeyword } =
    useUserListUseCase();

  const [list, setList] = useState(userList);

  useEffect(() => {
    if (!isLoading) {
      setList(userList);
    }
  }, [isLoading, userList]);

  return {
    userList: list,
    isLoading,
    setPage,
    setRowsPerPage,
    setKeyword,
  };
};

import { useUserListUseCase } from '../../../../useCases/user/userList.useCase';

export const useUserList = () => {
  const { userList, setPage, setRowsPerPage } = useUserListUseCase();

  return {
    userList,
    setPage,
    setRowsPerPage,
  };
};

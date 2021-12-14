import Table, { RenderItemArgs } from '../../../common/components/table/Table';
import {
  UpdateUserDto,
  UserListItem as User,
} from '../../../../../out/typescript';
import { useCallback, useState } from 'react';

import { Paper } from '@mui/material';
import SearchBar from '../../../common/components/SearchBar';
import TablePagination from '../../../common/components/table/TablePagination';
import TableTitleWrapper from '../../../common/components/table/TableTitleWrapper';
import UserFormDialog from './UserFormDialog';
import UserListItem from './UserListItem';
import styled from 'styled-components';
import usePagination from '../../../common/hooks/usePagination';
import { useUserList } from '../hooks/useUserList';
import { getAxiosError } from '../../../../libs/Error';
import { useAlertStack } from '../../../common/components/layout/AlertStackProvider';

const UserListPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const {
    userList,
    isLoading,
    setPage,
    setRowsPerPage,
    setKeyword,
    handleUpdateUser,
    handleRemoveUser,
  } = useUserList();
  const { pushAlert } = useAlertStack();

  const pagination = usePagination({
    totalCount: userList.totalCount,
    onChangePage: setPage,
    onChangeRowsPerPage: setRowsPerPage,
  });

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleClickItem = useCallback((user: User) => {
    if (user.status === 'WITHDRAWAL') {
      return pushAlert({
        severity: 'error',
        message: '탈퇴한 계정은 수정 할 수 없습니다.',
      });
    }
    setUser(user);
    setTimeout(() => {
      setOpen(true);
    }, 100);
  }, []);

  const handleSubmitSearch = useCallback(
    e => {
      setKeyword(e.target.value);
    },
    [setKeyword],
  );

  const handleSubmitUpdate = useCallback(
    async (userId: number, newUser: UpdateUserDto) => {
      try {
        await handleUpdateUser(userId, newUser);
      } catch (error) {
        const axiosError = getAxiosError(error);
        if (axiosError) {
          const { errorCode, errorMsg } = axiosError;
          if (errorCode === 4040) {
            pushAlert({ severity: 'error', message: errorMsg });
          }
        }
        throw error;
      }
    },
    [handleUpdateUser, pushAlert],
  );

  const handleSubmitDelete = useCallback(
    async (userId: number) => {
      try {
        await handleRemoveUser(userId);
      } catch (error) {
        const axiosError = getAxiosError(error);
        if (axiosError) {
          const { errorCode, errorMsg } = axiosError;
          if (errorCode === 4040) {
            pushAlert({ severity: 'error', message: errorMsg });
          }
        }
        throw error;
      }
    },
    [handleRemoveUser, pushAlert],
  );

  const renderItem = ({ item }: RenderItemArgs<User>): JSX.Element => {
    return <UserListItem item={item} onClickItem={handleClickItem} />;
  };

  return (
    <StyledWrapper className="container">
      <div className="table-container">
        <Paper className="paper-wrapper">
          <div className="table-wrapper">
            <TableTitleWrapper title="Users" />
            <SearchBar isLoading={isLoading} onSubmit={handleSubmitSearch} />
            <Table<User>
              className="table"
              keyExtractor={(item, index) => `${item.id}`}
              heads={[
                'profile',
                'id',
                'nickname',
                'role',
                'status',
                'joined at',
              ]}
              items={userList.users}
              renderItem={renderItem}
            />
          </div>
          <div className="table-pagination-wrapper">
            <TablePagination {...pagination} />
          </div>
        </Paper>
      </div>
      <UserFormDialog
        user={user}
        open={open}
        onClose={handleClose}
        onSubmitUpdate={handleSubmitUpdate}
        onSubmitDelete={handleSubmitDelete}
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0 3px;
  height: 100%;

  .search-wrapper {
    padding-bottom: 15px;
  }

  .table-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: hidden;

    .paper-wrapper {
      max-height: calc(100% - 1px);
      overflow-y: hidden;
    }

    .table-wrapper {
      max-height: calc(100% - 50px);
      overflow-y: auto;

      .table {
        flex: 1;
        overflow-y: hidden;
        display: flex;
        flex-direction: column;

        .tbody {
          overflow-y: auto;

          &::-webkit-scrollbar {
            width: 5px;
          }

          &::-webkit-scrollbar,
          &::-webkit-scrollbar-thumb {
            border-radius: 2px;
          }

          &::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.2);
          }
        }

        .th,
        .td {
          width: 50px;
          padding: 10px 15px;
          max-height: 150px;

          &:first-child {
            width: 100px;
          }

          &:nth-child(2) {
            width: 80px;
          }

          &:nth-child(n + 3):nth-child(-n + 5) {
            flex: 1;
          }

          &:last-child {
            min-width: 180px;
          }
        }
      }
    }
  }
`;

export default UserListPage;

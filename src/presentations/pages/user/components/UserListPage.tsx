import Table, { RenderItemArgs } from '../../../common/components/table/Table';

import { UserListItem as Item } from '../../../../../out/typescript';
import ModalCard from '../../../common/components/layout/ModalCard';
import { Paper } from '@mui/material';
import SearchBar from '../../../common/components/SearchBar';
import TablePagination from '../../../common/components/table/TablePagination';
import TableTitleWrapper from '../../../common/components/table/TableTitleWrapper';
import UserListItem from './UserListItem';
import styled from 'styled-components';
import { useCallback } from 'react';
import usePagination from '../../../common/hooks/usePagination';
import { useUserList } from '../hooks/useUserList';

const UserListPage = () => {
  const { userList, isLoading, setPage, setRowsPerPage, setKeyword } =
    useUserList();
  const pagination = usePagination({
    totalCount: userList.totalCount,
    onChangePage: setPage,
    onChangeRowsPerPage: setRowsPerPage,
  });

  const handleSubmit = useCallback(
    e => {
      setKeyword(e.target.value);
    },
    [setKeyword],
  );

  const renderItem = ({ item }: RenderItemArgs<Item>): JSX.Element => {
    return <UserListItem item={item} />;
  };

  return (
    <StyledWrapper className="container">
      <div className="table-container">
        <Paper className="paper-wrapper">
          <div className="table-wrapper">
            <TableTitleWrapper title="Users" />
            <SearchBar isLoading={isLoading} onSubmit={handleSubmit} />
            <Table<Item>
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
      <ModalCard open={false}>
        <div>Modal</div>
      </ModalCard>
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

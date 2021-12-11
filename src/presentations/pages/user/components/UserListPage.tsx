import ModalCard from '../../../common/components/layout/ModalCard';
import { Paper } from '@mui/material';
import SearchBar from '../../../common/components/SearchBar';
import Table from '../../../common/components/table/Table';
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

  return (
    <StyledWrapper className="container">
      <div className="table-container">
        <Paper className="paper-wrapper">
          <div className="table-wrapper">
            <TableTitleWrapper title="Users" />
            <SearchBar isLoading={isLoading} onSubmit={handleSubmit} />
            {/* <Table>
              <thead>
                <tr>
                  <th>id</th>
                  <th>nickname</th>
                  <th>role</th>
                  <th>joined</th>
                </tr>
              </thead>
              <div className="tbody-wrapper">
                <tbody>
                  {userList.users.map(user => (
                    <UserListItem key={user.id} item={user} />
                  ))}
                </tbody>
              </div>
            </Table> */}
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

      &::-webkit-scrollbar {
        width: 5px;
      }

      &::-webkit-scrollbar,
      &::-webkit-scrollbar-thumb {
        overflow: visible;
        border-radius: 2px;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
      }
    }
  }
`;

export default UserListPage;

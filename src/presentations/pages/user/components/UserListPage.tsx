import ModalCard from '../../../common/components/layout/ModalCard';
import { Paper } from '@mui/material';
import SearchBar from '../../../common/components/SearchBar';
import Table from '../../../common/components/Table';
import TablePagination from '../../../common/components/TablePagination';
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
      <div className="col">
        <SearchBar isLoading={isLoading} onSubmit={handleSubmit} />
        <Paper className="col">
          <Table {...pagination}>
            <thead>
              <tr>
                <th>id</th>
                <th>nickname</th>
                <th>role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {userList.users.map(user => (
                <UserListItem key={user.id} item={user} />
              ))}
            </tbody>
          </Table>
          <TablePagination {...pagination} />
        </Paper>
      </div>
      <ModalCard open={false}>
        <div>Modal</div>
      </ModalCard>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loading-wrapper {
    display: flex;
    flex: 1;
  }
`;

export default UserListPage;

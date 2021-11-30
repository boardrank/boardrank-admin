import ModalCard from '../../../common/components/layout/ModalCard';
import Table from '../../../common/components/Table';
import TablePagination from '../../../common/components/TablePagination';
import UserListItem from './UserListItem';
import styled from 'styled-components';
import usePagination from '../../../common/hooks/usePagination';
import { useUserList } from '../hooks/useUserList';
import SearchBar from '../../../common/components/SearchBar';
import { Paper } from '@mui/material';

const UserListPage = () => {
  const { userList, setPage, setRowsPerPage } = useUserList();
  const pagination = usePagination({
    totalCount: userList.totalCount,
    onChangePage: setPage,
    onChangeRowsPerPage: setRowsPerPage,
  });

  return (
    <StyledWrapper className="container">
      <div className="col">
        <SearchBar
          onSubmit={e => {
            console.log(e.target);
          }}
        />
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

const StyledWrapper = styled.div``;

export default UserListPage;

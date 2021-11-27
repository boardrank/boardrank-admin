import Card from '../../../common/components/layout/Card';
import ModalCard from '../../../common/components/layout/ModalCard';
import Table from '../../../common/components/Table';
import TablePagination from '../../../common/components/TablePagination';
import UserListItem from './UserListItem';
import styled from 'styled-components';
import usePagination from '../../../common/hooks/usePagination';
import { useUserList } from '../hooks/useUserList';

const UserListPage = () => {
  const { userList, setPage, setRowsPerPage } = useUserList();
  const pagination = usePagination({
    totalCount: userList.totalCount,
    onChangePage: setPage,
    onChangeRowsPerPage: setRowsPerPage,
  });

  return (
    <StyledWrapper className="container">
      <div className="row">
        <Card className="col">
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
        </Card>
      </div>
      <ModalCard open={false}>
        <div>Modal</div>
      </ModalCard>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div``;

export default UserListPage;

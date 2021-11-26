import Card from '../../../common/components/layout/Card';
import Table from '../../../common/components/Table';
import TablePagination from '../../../common/components/TablePagination';
import UserListItem from './UserListItem';
import styled from 'styled-components';
import usePagination from '../../../common/hooks/usePagination';
import { useUserList } from '../hooks/useUserList';

const UserListPage = () => {
  const { userList, setPage } = useUserList();
  const pagination = usePagination({
    totalCount: userList.totalCount,
    onChangePage: setPage,
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
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div``;

export default UserListPage;

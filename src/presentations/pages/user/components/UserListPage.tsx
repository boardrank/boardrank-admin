import Card from '../../../common/components/layout/Card';
import Table from '../../../common/components/Table';
import TablePagination from '../../../common/components/TablePagination';
import styled from 'styled-components';
import usePagination from '../../../common/hooks/usePagination';

const UserListPage = () => {
  const pagination = usePagination({ totalCount: 21 });

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
              <tr>
                <td>1</td>
                <td>Bright</td>
                <td>ADMIN</td>
                <td>2021.11.22</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Bright</td>
                <td>ADMIN</td>
                <td>2021.11.22</td>
              </tr>
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

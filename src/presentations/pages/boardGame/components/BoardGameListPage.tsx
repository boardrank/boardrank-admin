import BoardGameListItem from './BoardGameListItem';
import { Paper } from '@mui/material';
import SearchBar from '../../../common/components/SearchBar';
import Table from '../../../common/components/Table';
import TablePagination from '../../../common/components/TablePagination';
import styled from 'styled-components';
import { useBoardGameList } from '../hooks/useBoardGameList';
import { useCallback } from 'react';
import usePagination from '../../../common/hooks/usePagination';

const BoardGameListPage = () => {
  const { boardGameList, isLoading, setPage, setRowsPerPage, setKeyword } =
    useBoardGameList();
  const pagination = usePagination({
    totalCount: 0,
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
          <Table>
            <thead>
              <tr>
                <th>thumbnail</th>
                <th>id</th>
                <th>name</th>
                <th>description</th>
                <th>created at</th>
              </tr>
            </thead>
            <tbody>
              {boardGameList.boardGames.map(boardGame => (
                <BoardGameListItem item={boardGame} />
              ))}
            </tbody>
          </Table>
          <TablePagination {...pagination} />
        </Paper>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div``;

export default BoardGameListPage;

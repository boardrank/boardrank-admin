import Table, { RenderItemArgs } from '../../../common/components/table/Table';

import { AdminBoardGameListItem } from '../../../../../out/typescript';
import BoardGameListItem from './BoardGameListItem';
import { Paper } from '@mui/material';
import SearchBar from '../../../common/components/SearchBar';
import TablePagination from '../../../common/components/table/TablePagination';
import TableTitleWrapper from '../../../common/components/table/TableTitleWrapper';
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

  const renderItem = ({
    item,
  }: RenderItemArgs<AdminBoardGameListItem>): JSX.Element => {
    return <BoardGameListItem item={item} />;
  };

  return (
    <StyledWrapper className="container">
      <div className="table-container">
        <Paper className="paper-wrapper">
          <div className="table-wrapper">
            <TableTitleWrapper title="Board Games" />
            <SearchBar isLoading={isLoading} onSubmit={handleSubmit} />
            <Table<AdminBoardGameListItem>
              className="table"
              keyExtractor={(item, index) => `${item.id}`}
              heads={['thumbnail', 'id', 'name', 'description', 'created at']}
              items={boardGameList.boardGames}
              renderItem={renderItem}
            />
          </div>
          <div className="table-pagination-wrapper">
            <TablePagination {...pagination} />
          </div>
        </Paper>
      </div>
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
      display: flex;
      flex-direction: column;
      overflow-y: hidden;

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

          &:first-child {
            min-width: 100px;
          }

          &:nth-child(2) {
            min-width: 50px;
          }

          &:nth-child(3) {
            min-width: 150px;
          }

          &:nth-child(4) {
            flex: 1;
          }

          &:last-child {
            min-width: 180px;
          }
        }

        .td {
          height: 120px;

          &:first-child {
            padding: 10px 0;
          }

          &:nth-child(4) {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
`;

export default BoardGameListPage;

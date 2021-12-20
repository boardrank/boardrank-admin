import { Button, Paper } from '@mui/material';
import {
  CreateBoardGameDto,
  AdminBoardGameListItem as Item,
  UpdateBoardGameDto,
} from '../../../../../out/typescript';
import Table, { RenderItemArgs } from '../../../common/components/table/Table';
import { useCallback, useState } from 'react';

import BoardGameFormDialog from './BoardGameFormDialog';
import BoardGameListItem from './BoardGameListItem';
import SearchBar from '../../../common/components/SearchBar';
import TablePagination from '../../../common/components/table/TablePagination';
import TableTitleButtonWrapper from '../../../common/components/table/TableTitleButtonWrapper';
import TableTitleWrapper from '../../../common/components/table/TableTitleWrapper';
import { getAxiosError } from '../../../../libs/Error';
import styled from 'styled-components';
import { useAlertStack } from '../../../common/components/layout/AlertStackProvider';
import { useBoardGameList } from '../hooks/useBoardGameList';
import usePagination from '../../../common/hooks/usePagination';

const BoardGameListPage = () => {
  const [open, setOpen] = useState<boolean>(false);

  const {
    boardGameList,
    boardGame,
    isLoading,
    setPage,
    setRowsPerPage,
    setKeyword,
    handleAddBoardGame,
    handleUpdateBoardGame,
    handleRemoveBoardGame,
    resetBoardGame,
    handleClickBoardGame,
  } = useBoardGameList();
  const pagination = usePagination({
    totalCount: boardGameList.totalCount,
    onChangePage: setPage,
    onChangeRowsPerPage: setRowsPerPage,
  });

  const { pushAlert } = useAlertStack();

  const handleClose = useCallback(() => {
    resetBoardGame();
    setOpen(false);
  }, [resetBoardGame]);

  const handleClickNewBoardGame = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClickBoardGameItem = useCallback(
    async (boardGame: Item) => {
      try {
        await handleClickBoardGame(boardGame.id);
        setOpen(true);
      } catch (error) {
        const axiosError = getAxiosError(error);
        if (axiosError) {
          const { errorCode, errorMsg } = axiosError;
          if (errorCode === 4010 || errorCode === 4031) {
            pushAlert({ severity: 'error', message: errorMsg });
          }
        }
        throw error;
      }
    },
    [handleClickBoardGame, pushAlert],
  );

  const handleSubmitAdd = useCallback(
    async (newBoardGame: CreateBoardGameDto, file: File | Blob) => {
      try {
        handleAddBoardGame(newBoardGame, file);
      } catch (error) {
        const axiosError = getAxiosError(error);
        if (axiosError) {
          const { errorCode, errorMsg } = axiosError;
          if (errorCode === 4010 || errorCode === 4031) {
            pushAlert({ severity: 'error', message: errorMsg });
          }
        }
        throw error;
      }
    },
    [handleAddBoardGame, pushAlert],
  );

  const handleSubmitUpdate = useCallback(
    async (
      boardGameId: number,
      newBoardGame: UpdateBoardGameDto,
      file?: File | Blob,
    ) => {
      try {
        handleUpdateBoardGame(boardGameId, newBoardGame, file);
      } catch (error) {
        const axiosError = getAxiosError(error);
        if (axiosError) {
          const { errorCode, errorMsg } = axiosError;
          if (errorCode === 4010 || errorCode === 4031 || errorCode === 4040) {
            pushAlert({ severity: 'error', message: errorMsg });
          }
        }
        throw error;
      }
    },
    [handleUpdateBoardGame, pushAlert],
  );

  const handleSubmitDelete = useCallback(
    async (boardGameId: number) => {
      try {
        handleRemoveBoardGame(boardGameId);
      } catch (error) {
        const axiosError = getAxiosError(error);
        if (axiosError) {
          const { errorCode, errorMsg } = axiosError;
          if (errorCode === 4010 || errorCode === 4031 || errorCode === 4040) {
            pushAlert({ severity: 'error', message: errorMsg });
          }
        }
        throw error;
      }
    },
    [handleRemoveBoardGame, pushAlert],
  );

  const handleSubmitSearch = useCallback(
    e => {
      setKeyword(e.target.value);
    },
    [setKeyword],
  );

  const renderItem = useCallback(
    ({ item }: RenderItemArgs<Item>): JSX.Element => {
      return (
        <BoardGameListItem item={item} onClickItem={handleClickBoardGameItem} />
      );
    },
    [handleClickBoardGameItem],
  );

  return (
    <StyledWrapper className="container">
      <div className="table-container">
        <Paper className="paper-wrapper">
          <div className="table-wrapper">
            <TableTitleWrapper title="Board Games">
              <TableTitleButtonWrapper>
                <Button variant="contained" onClick={handleClickNewBoardGame}>
                  + New Board Game
                </Button>
              </TableTitleButtonWrapper>
            </TableTitleWrapper>
            <SearchBar isLoading={isLoading} onSubmit={handleSubmitSearch} />
            <Table<Item>
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
      <BoardGameFormDialog
        boardGame={boardGame}
        open={open}
        onClose={handleClose}
        onSubmitAdd={handleSubmitAdd}
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
            overflow: hidden;
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
        }
      }
    }
  }
`;

export default BoardGameListPage;

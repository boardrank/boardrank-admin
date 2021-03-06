import { Button, Paper } from '@mui/material';
import {
  CreateGenreDto,
  Genre,
  UpdateGenreDto,
} from '../../../../../out/typescript';
import DraggableTable, {
  RenderItemArgs,
} from '../../../common/components/table/DraggableTable';
import { useCallback, useState } from 'react';

import GenreFormDialog from './GenreFormDialog';
import GenreListItem from './GenreListItem';
import TableTitleButtonWrapper from '../../../common/components/table/TableTitleButtonWrapper';
import TableTitleWrapper from '../../../common/components/table/TableTitleWrapper';
import { getAxiosError } from '../../../../libs/Error';
import styled from 'styled-components';
import { useAlertStack } from '../../../common/components/layout/AlertStackProvider';
import { useGenreList } from '../hooks/useGenreList';

const GenreList = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [genre, setGenre] = useState<Genre | null>(null);
  const {
    genres,
    handleChangeOrder,
    handleAddGenre,
    handleUpdateGenre,
    handleRemoveGenre,
  } = useGenreList();
  const { pushAlert } = useAlertStack();

  const handleClickNewGenre = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleClickItem = useCallback((genre: Genre) => {
    setGenre(genre);
    setTimeout(() => {
      setOpen(true);
    }, 100);
  }, []);

  const handleCloseUpdate = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      setGenre(null);
    }, 100);
  }, []);

  const handleSubmitAdd = useCallback(
    async (newGenre: CreateGenreDto) => {
      try {
        await handleAddGenre(newGenre);
      } catch (error) {
        const axiosError = getAxiosError(error);
        if (axiosError) {
          const { errorCode, errorMsg } = axiosError;
          if (errorCode === 4091) {
            pushAlert({ severity: 'error', message: errorMsg });
          }
        }
        throw error;
      }
    },
    [handleAddGenre, pushAlert],
  );

  const handleSubmitUpdate = useCallback(
    async (genreId: number, newGenre: UpdateGenreDto) => {
      try {
        await handleUpdateGenre(genreId, newGenre);
      } catch (error) {
        const axiosError = getAxiosError(error);
        if (axiosError) {
          const { errorCode, errorMsg } = axiosError;
          if (errorCode === 4091) {
            pushAlert({ severity: 'error', message: errorMsg });
          }
        }
        throw error;
      }
    },
    [handleUpdateGenre, pushAlert],
  );

  const handleClickRemove = useCallback(
    async (genreId: number) => {
      try {
        await handleRemoveGenre(genreId);
      } catch (error: any) {
        const axiosError = getAxiosError(error);
        if (axiosError) {
          const { errorCode, errorMsg } = axiosError;
          if (errorCode === 4092 || errorCode === 4040) {
            pushAlert({ severity: 'error', message: errorMsg });
          }
        }
      }
    },
    [handleRemoveGenre, pushAlert],
  );

  const renderItem = ({ item, provided, snapshot }: RenderItemArgs<Genre>) => {
    return (
      <GenreListItem
        item={item}
        ref={provided.innerRef}
        draggableProps={provided.draggableProps}
        dragHandleProps={provided.dragHandleProps}
        style={provided.draggableProps.style}
        onClickItem={handleClickItem}
        onClickRemove={handleClickRemove}
      />
    );
  };

  return (
    <StyledWrapper>
      <Paper className="paper-wrapper">
        <div className="table-wrapper">
          <TableTitleWrapper title="All Genres">
            <TableTitleButtonWrapper>
              <Button variant="contained" onClick={handleClickNewGenre}>
                + New Genre
              </Button>
            </TableTitleButtonWrapper>
          </TableTitleWrapper>
          {/* ????????? */}
          <DraggableTable<Genre>
            className="table"
            keyExtractor={(item, index) => `${item.id}`}
            heads={['', 'id', 'name', 'code', 'order', '']}
            items={genres}
            onDragEnd={handleChangeOrder}
            renderItem={renderItem}
          />
        </div>
      </Paper>
      <GenreFormDialog
        genre={genre}
        open={open}
        onClose={genre ? handleCloseUpdate : handleClose}
        onSubmitAdd={handleSubmitAdd}
        onSubmitUpdate={handleSubmitUpdate}
      />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;

  .paper-wrapper {
    max-height: calc(100% - 1px);
    overflow-y: hidden;
  }

  .table-wrapper {
    max-height: 100%;
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

      .th {
        width: 50px;
        padding: 10px 0;

        &:nth-child(2),
        &:nth-child(5) {
          width: 100px;
        }

        &:nth-child(n + 3):nth-child(-n + 4) {
          flex: 1;
        }
      }

      .td {
        width: 50px;
        padding: 10px 0;

        &:nth-child(2),
        &:nth-child(5) {
          width: 100px;
        }

        &:nth-child(n + 3):nth-child(-n + 4) {
          flex: 1;
        }
      }
    }
  }
`;

export default GenreList;

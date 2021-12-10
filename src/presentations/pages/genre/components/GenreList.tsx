import { Button, Paper } from '@mui/material';
import DraggableTable, {
  RenderItemArgs,
} from '../../../common/components/table/DraggableTable';

import { Genre } from '../../../../../out/typescript';
import GenreListItem from './GenreListItem';
import TableTitleButtonWrapper from '../../../common/components/table/TableTitleButtonWrapper';
import TableTitleWrapper from '../../../common/components/table/TableTitleWrapper';
import { getAxiosError } from '../../../../libs/Error';
import styled from 'styled-components';
import { useAlertStack } from '../../../common/components/layout/AlertStackProvider';
import { useCallback } from 'react';
import { useGenreList } from '../hooks/useGenreList';

const GenreList = () => {
  const { genres, handleChangeOrder, ...genreList } = useGenreList();
  const { pushAlert } = useAlertStack();

  const handleClickRemove = useCallback(
    async (genreId: number) => {
      try {
        await genreList.handleClickRemove(genreId);
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
    [genreList, pushAlert],
  );

  const renderItem = ({ item, provided, snapshot }: RenderItemArgs<Genre>) => {
    return (
      <GenreListItem
        item={item}
        ref={provided.innerRef}
        draggableProps={provided.draggableProps}
        dragHandleProps={provided.dragHandleProps}
        style={provided.draggableProps.style}
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
              <Button variant="contained">+ New Genre</Button>
            </TableTitleButtonWrapper>
          </TableTitleWrapper>
          {/* 테이블 */}
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
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .paper-wrapper {
    max-height: 96.5%;
    overflow-y: hidden;
    margin-bottom: 15px;
  }

  .table-wrapper {
    max-height: 100%;
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

    .table {
      .th {
        width: 40px;

        &:nth-child(2),
        &:nth-child(5) {
          width: 100px;
        }

        &:nth-child(n + 3):nth-child(-n + 4) {
          flex: 1;
        }
      }

      .td {
        width: 40px;

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

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { ApiErrorResponse } from '../../../../../out/typescript';
import GenreListItem from './GenreListItem';
import { Paper } from '@mui/material';
import { getAxiosError } from '../../../../libs/Error';
import styled from 'styled-components';
import { useAlertStack } from '../../../common/components/layout/AlertStackProvider';
import { useCallback } from 'react';
import { useGenreList } from '../hooks/useGenreList';

const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
  return {
    ...draggableStyle,
  };
};

const GenreListPage = () => {
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

  return (
    <DragDropContext onDragEnd={handleChangeOrder}>
      <StyledWrapper>
        <div className="table-container">
          <Paper className="paper-wrapper">
            <div className="table-wrapper">
              <div className="table">
                <div className="thead">
                  <div className="tr">
                    <div className="th"></div>
                    <div className="th">id</div>
                    <div className="th">name</div>
                    <div className="th">code</div>
                    <div className="th">order</div>
                    <div className="th"></div>
                  </div>
                </div>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      className="tbody"
                      ref={provided.innerRef}
                      {...provided.droppableProps}>
                      {genres.map((genre, index) => (
                        <Draggable
                          key={genre.id}
                          draggableId={`${genre.id}`}
                          index={index}>
                          {(provided, snapshot) => (
                            <GenreListItem
                              item={genre}
                              ref={provided.innerRef}
                              draggableProps={provided.draggableProps}
                              dragHandleProps={provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                              )}
                              onClickRemove={handleClickRemove}
                            />
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </Paper>
        </div>
      </StyledWrapper>
    </DragDropContext>
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
      max-height: 96.5%;
      overflow-y: hidden;
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
        width: 100%;
        height: 100%;
        background-color: transparent;
        margin: 0;

        .tr {
          width: 100%;
          display: flex;
          flex-direction: row;
          padding: 0 5px;
        }

        .thead {
          color: #7b809a;
          font-size: 0.7em;
          font-weight: bold;
          position: sticky;
          top: 0;
          background-color: white;

          .tr {
            text-transform: uppercase;

            .th {
              text-align: center;
              padding: 15px 15px 10px;
              background-color: white;
              width: 40px;

              &:nth-child(2) {
                width: 100px;
              }

              &:nth-child(n + 3):nth-child(-n + 5) {
                flex: 1;
              }
            }
          }
        }

        .tbody {
          font-size: 0.875em;
          border-top: none;

          .tr {
            border-top: 1px solid #eee;
            cursor: pointer;

            &:hover {
              background-color: #eee;
            }

            &:active {
              background-color: #ddd;
            }

            .td {
              display: flex;
              text-align: center;
              justify-content: center;
              align-items: center;
              width: 40px;
              padding: 10px 0;

              &:nth-child(2) {
                width: 100px;
              }

              &:nth-child(n + 3):nth-child(-n + 5) {
                flex: 1;
              }
            }
          }
        }
      }
    }
  }
`;

export default GenreListPage;

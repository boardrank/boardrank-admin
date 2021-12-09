import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
  ResponderProvided,
} from 'react-beautiful-dnd';

import GenreListItem from './GenreListItem';
import { Paper } from '@mui/material';
import styled from 'styled-components';
import { useGenreList } from '../hooks/useGenreList';
import { useOrderGenreList } from '../hooks/useOrderGenreList';

const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
  return {
    ...draggableStyle,
  };
};

const GenreListPage = () => {
  const { genreList } = useGenreList();
  const { genres, handleChangeOrder } = useOrderGenreList({ genreList });

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
                      {...provided.droppableProps}
                      ref={provided.innerRef}>
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

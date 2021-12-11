import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DropResult,
  Droppable,
  ResponderProvided,
} from 'react-beautiful-dnd';

import styled from 'styled-components';

export interface RenderItemArgs<T> {
  item: T;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

interface DraggableTableProps<T> {
  className?: string;
  heads: string[];
  items: T[];
  keyExtractor(item: T, index: number): string;
  onDragEnd(result: DropResult, provided: ResponderProvided): void;
  renderItem(renderItemArgs: RenderItemArgs<T>): JSX.Element;
}

function DraggableTable<T>({
  className,
  heads,
  items,
  keyExtractor,
  onDragEnd,
  renderItem,
}: DraggableTableProps<T>) {
  return (
    <StyledWrapper className={className}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="thead">
          <div className="tr">
            {heads.map((head, index) => (
              <div key={`${index}`} className="th">
                {head}
              </div>
            ))}
          </div>
        </div>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              className="tbody"
              ref={provided.innerRef}
              {...provided.droppableProps}>
              {items.map((item, index) => (
                <Draggable
                  key={keyExtractor(item, index)}
                  draggableId={keyExtractor(item, index)}
                  index={index}>
                  {(provided, snapshot) =>
                    renderItem({ item, provided, snapshot })
                  }
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
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
        display: flex;
        flex-direction: row;
        align-items: center;
        text-align: left;
        padding: 10px 15px;
        background-color: white;
        border-bottom: 1px solid #eee;
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
        flex-direction: row;
        align-items: center;
        text-align: left;
        padding: 10px 15px;
      }
    }
  }
`;

export default DraggableTable;

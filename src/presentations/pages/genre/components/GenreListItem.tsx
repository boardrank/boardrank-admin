import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from 'react-beautiful-dnd';
import { MouseEventHandler, forwardRef, useCallback } from 'react';
import styled, { CSSProperties } from 'styled-components';

import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { IconButton } from '@mui/material';
import { Genre as Item } from '../../../../../out/typescript/models/Genre';

interface GenreListItemProps {
  item: Item;
  style?: CSSProperties;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  onClickItem?: (item: Item) => void;
  onClickRemove?: (genreId: number) => void;
}

const GenreListItem = forwardRef<
  HTMLTableRowElement | null,
  GenreListItemProps
>(
  (
    {
      item,
      style,
      draggableProps,
      dragHandleProps,
      onClickItem,
      onClickRemove,
    },
    ref,
  ) => {
    const { id, name, code, order } = item;

    const handleClickItem = useCallback(() => {
      if (onClickItem) onClickItem(item);
    }, [item, onClickItem]);

    const handleClickRemove: MouseEventHandler<HTMLButtonElement> = useCallback(
      e => {
        e.stopPropagation();
        if (onClickRemove) onClickRemove(id);
      },
      [onClickRemove, id],
    );

    return (
      <StyledWrapper
        ref={ref}
        className="tr"
        {...draggableProps}
        style={{ ...style }}
        onClick={handleClickItem}
      >
        <div className="td move">
          <IconButton
            aria-label="drag-indicator"
            sx={{ width: 35, height: 35 }}
            {...dragHandleProps}
          >
            <DragIndicatorIcon />
          </IconButton>
        </div>
        <div className="td id">{id}</div>
        <div className="td">{name}</div>
        <div className="td">{code}</div>
        <div className="td">{order}</div>
        <div className="td remove">
          <IconButton
            aria-label="remove"
            sx={{ width: 30, height: 30 }}
            onClick={handleClickRemove}
          >
            <CloseIcon sx={{ color: '#FF2A37', width: 20, height: 20 }} />
          </IconButton>
        </div>
      </StyledWrapper>
    );
  },
);

const StyledWrapper = styled.div`
  .move,
  .remove {
    width: 40px;
    padding: 0;

    button {
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
    }

    &:hover {
      button {
        opacity: 1;
        cursor: grab;
      }
    }
  }
`;

export default GenreListItem;

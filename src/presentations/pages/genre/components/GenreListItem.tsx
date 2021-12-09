import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { IconButton } from '@mui/material';
import { Genre as Item } from '../../../../../out/typescript/models/Genre';
import styled from 'styled-components';

interface GenreListItemProps {
  item: Item;
}

const GenreListItem = ({
  item: { id, name, code, order },
}: GenreListItemProps) => {
  return (
    <StyledWrapper>
      <td className="move">
        <IconButton aria-label="drag-indicator" sx={{ width: 35, height: 35 }}>
          <DragIndicatorIcon />
        </IconButton>
      </td>
      <td className="id">{id}</td>
      <td>{name}</td>
      <td>{code}</td>
      <td>{order}</td>
      <td className="remove">
        <IconButton aria-label="remove" sx={{ width: 30, height: 30 }}>
          <CloseIcon sx={{ color: '#FF2A37', width: 20, height: 20 }} />
        </IconButton>
      </td>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.tr`
  min-height: 100px;

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
      }
    }
  }

  .id {
    width: 100px;
  }
`;

export default GenreListItem;

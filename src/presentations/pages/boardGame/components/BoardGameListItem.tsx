import { BoardGameListItem as Item } from '../../../../../out/typescript/models/BoardGameListItem';
import dateFormat from 'dateformat';
import styled from 'styled-components';

interface BoardGameListItemProps {
  item: Item;
}

const BoardGameListItem = ({
  item: { thumbnailUrl, id, name, description },
}: BoardGameListItemProps) => {
  return (
    <StyledWrapper>
      <td>
        <img className="thumbnail" src={thumbnailUrl} alt="thumbnail" />
      </td>
      <td>{id}</td>
      <td className="name">{name}</td>
      <td className="description">{description}</td>
      <td className="date">
        {dateFormat(new Date(), 'yyyy-mm-dd hh:MM:ss', true)}
      </td>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.tr`
  min-height: 100px;

  td {
    vertical-align: top;
  }

  .thumbnail {
    width: 100px;
  }

  .name {
    min-width: 150px;
  }

  .description {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .date {
    min-width: 180px;
  }
`;

export default BoardGameListItem;

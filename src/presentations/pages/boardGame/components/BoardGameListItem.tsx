import { memo, useCallback, useMemo } from 'react';

import { AdminBoardGameListItem as Item } from '../../../../../out/typescript/models/AdminBoardGameListItem';
import dateFormat from 'dateformat';
import styled from 'styled-components';

interface BoardGameListItemProps {
  item: Item;
  onClickItem?: (item: Item) => void;
}

const BoardGameListItem = ({ item, onClickItem }: BoardGameListItemProps) => {
  const { thumbnailUrl, id, name, description } = item;

  const handleClick = useCallback(() => {
    if (onClickItem) onClickItem(item);
  }, [item, onClickItem]);

  const url = useMemo(() => {
    return thumbnailUrl.replace('%2Forigin%2F', '%2F256%2F');
  }, [thumbnailUrl]);

  return (
    <StyledWrapper className="tr" onClick={handleClick}>
      <div className="td">
        <img className="thumbnail" src={url} alt="thumbnail" />
      </div>
      <div className="td">{id}</div>
      <div className="td">{name}</div>
      <div className="td">
        <p className="description">{description}</p>
      </div>
      <div className="td">
        {dateFormat(new Date(), 'yyyy-mm-dd hh:MM:ss', true)}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;

  .thumbnail {
    width: 100px;
  }

  .description {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-height: 1.6;
  }
`;

export default memo(BoardGameListItem, (prev, next) => prev.item === next.item);

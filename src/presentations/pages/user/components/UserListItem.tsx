import { UserListItem as Item } from '../../../../../out/typescript/models/UserListItem';
import dateFormat from 'dateformat';
import styled from 'styled-components';
import { useCallback } from 'react';

interface UserListItemProps {
  item: Item;
  onClickItem?: (item: Item) => void;
}

const UserListItem = ({ item, onClickItem }: UserListItemProps) => {
  const { id, profileUrl, nickname, role, status, createdAt } = item;

  const handleClickItem = useCallback(() => {
    if (onClickItem) onClickItem(item);
  }, [item, onClickItem]);

  return (
    <StyledWrapper className="tr" onClick={handleClickItem}>
      <div className="td">
        <img className="profile" src={profileUrl} alt="profile" />
      </div>
      <div className="td">{id}</div>
      <div className="td">{nickname}</div>
      <div className="td">{role}</div>
      <div className="td">{status}</div>
      <div className="td">
        {dateFormat(createdAt, 'yyyy-mm-dd hh:MM:ss', true)}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;

  .profile {
    width: 30px;
  }
`;

export default UserListItem;

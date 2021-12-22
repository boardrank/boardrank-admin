import { useCallback, useMemo } from 'react';

import { UserListItem as Item } from '../../../../../out/typescript/models/UserListItem';
import dateFormat from 'dateformat';
import styled from 'styled-components';

interface UserListItemProps {
  item: Item;
  onClickItem?: (item: Item) => void;
}

const UserListItem = ({ item, onClickItem }: UserListItemProps) => {
  const { id, nickname, role, status, createdAt } = item;

  const profileUrl = useMemo(() => {
    if (/^https:\/\/firebasestorage.googleapis.com/.test(item.profileUrl)) {
      return item.profileUrl.replace('%2Forigin%2F', '%2F48%2F');
    }
    return item.profileUrl;
  }, [item.profileUrl]);

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

import { UserListItem as Item } from '../../../../../out/typescript/models/UserListItem';
import dateFormat from 'dateformat';
import styled from 'styled-components';

interface UserListItemProps {
  item: Item;
}

const UserListItem = ({
  item: { id, profileUrl, nickname, role, createdAt },
}: UserListItemProps) => {
  return (
    <StyledWrapper className="tr">
      <div className="td">
        <img className="profile" src={profileUrl} alt="profile" />
      </div>
      <div className="td">{id}</div>
      <div className="td">{nickname}</div>
      <div className="td">{role}</div>
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

import { UserListItem as Item } from '../../../../../out/typescript/models/UserListItem';
import dateFormat from 'dateformat';

interface UserListItemProps {
  item: Item;
}

const UserListItem = ({
  item: { id, nickname, role, createdAt },
}: UserListItemProps) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{nickname}</td>
      <td>{role}</td>
      <td>{dateFormat(createdAt, 'yyyy-mm-dd hh:MM:ss', true)}</td>
    </tr>
  );
};

export default UserListItem;

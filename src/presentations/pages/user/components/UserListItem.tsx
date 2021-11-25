import { UserListItem as Item } from '../../../../../out/typescript/models/UserListItem';

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
      <td>{createdAt}</td>
    </tr>
  );
};

export default UserListItem;

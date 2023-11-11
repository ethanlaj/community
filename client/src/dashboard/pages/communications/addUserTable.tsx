import ReactiveSearchWithTable from './ReactiveSearchWithTable';
import { ComUser } from '@/types/user';

interface AddContactsAndOrganizationsProps {
  allUsers: ComUser[];
  users: ComUser[];
  handleChange: (id: string, value: any) => void;
  UsersError: string | undefined;
}

// A custom element that allows the user to add Users to the database.
function AddUserTable({
  allUsers,
  users,
  handleChange,
  UsersError,
}: AddContactsAndOrganizationsProps) {
  const UserOptions = allUsers.filter((user) => users.find((u) => u.id === user.id) === undefined);

  const handleUserSelect = (user: ComUser) => {
    const newUsers = [...users, user];
    handleChange('users', newUsers);
  };

  const handleUserDelete = (id: number) => {
    const newUsers = users.filter((u) => u.id !== id);
    handleChange('users', newUsers);
  };

  return (

    <ReactiveSearchWithTable
      id="users"
      classStyle=""
      tableHeaderName="User"
      selectedItems={users}
      options={UserOptions}
      selectionLabel="Select Users Involved In the Communication"
      error={UsersError}
      handleSelect={handleUserSelect}
      handleDelete={handleUserDelete}
    />
  );
}

export default AddUserTable;

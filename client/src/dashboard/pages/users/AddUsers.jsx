import { useState, useEffect } from 'react';
import { Alert, Button, Table } from 'react-bootstrap';
import userService from '@/services/userService';

function AddUsers({
  form, data, errors, onChange,
}) {
  const isChild = form !== undefined;
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const usersResult = await userService.getAll();
    setUsers(usersResult);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = (id, value) => {
    onChange([...data, value]);
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = data.filter((user) => user.id !== userId);
    onChange(updatedUsers);
  };

  return (
    <div>
      {!isChild && <h1>Add Users</h1>}
      {form.renderSearch(
        'user',
        users.filter((c) => !data.find((user) => user.id === c.id)),
        'id',
        'name',
        null,
        handleAddUser,
        true,
        'Search Users',
        fetchUsers,
      )}
      {errors.users && <Alert variant="danger">{errors.users}</Alert>}
      {data.length > 0 && (
        <Table striped bordered>
          <thead>
            <tr>
              <th>Added Users</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{users.find((c) => c.id === user.id)?.name}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default AddUsers;

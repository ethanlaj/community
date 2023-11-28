import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import userService from '@/services/userService';
import ClickableTable from '@/shared/components/ClickableTable';
import styles from './Admin.module.css';

function Admin() {
  const [users, setUsers] = useState([]);
  const formatDate = (date:any) => (date ? format(new Date(date), 'PPpp') : '');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await userService.getAll();

      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleRowClick = (row: any) => {
    navigate(`/admin/update-user/${row.id}`);
  };

  const handleRowDelete = async (row:any) => {
    const originalUsers = [...users];
    try {
      await userService.delete(row.id);

      toast.success('User deleted successfully');

      setUsers(users.filter((user:any) => user.id !== row.id));
    } catch {
      setUsers(originalUsers);
    }
  };

  const userColumns = [
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Office', field: 'office.name' },
    { title: 'Permission Level', field: 'permissionLevel' },
    { title: 'Created At', field: 'createdAt', render: (newDate:any) => formatDate(newDate.createdAt) },
    { title: 'Last Updated', field: 'updatedAt', render: (newDate:any) => formatDate(newDate.updatedAt) },
  ];

  return (
    <div className={styles.content}>
      <div className="mb-4 pb-4">
        <h1>Admin Portal</h1>
        <h2> Users </h2>
        <ClickableTable
          columns={userColumns}
          data={users}
          onRowClick={handleRowClick}
          onRowDelete={handleRowDelete}
          deleteModalRenderer={undefined}
        />
      </div>
    </div>
  );
}

export default Admin;

/* eslint-disable react/jsx-one-expression-per-line */
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import userService from '@/services/userService';
import TableSearch from '@/shared/components/TableSearch';
import filterSearch from '@/utils/filterSearch';
import ClickableTable from '@/shared/components/ClickableTable';
import styles from './Admin.module.css';
import { permissions } from './contants';
import { User } from '@/types/user';

function Admin() {
  const [users, setUsers] = useState([]);
  const formatDate = (date:any) => (date ? format(new Date(date), 'PPpp') : '');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await userService.getAll();

      setUsers(data);
    };

    fetchUsers();
  }, []);

  const filteredUsers = filterSearch(users, searchTerm, [], ['officeId']);

  const handleRowClick = (row: any) => {
    navigate(`/admin/${row.id}/edit`);
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
    {
      title: 'Permission Level',
      field: 'permissionLevel',
      render: (row: User) => (<div>{row.permissionLevel} - {permissions[row.permissionLevel]}</div>),
    },
    { title: 'Created At', field: 'createdAt', render: (newDate: User) => formatDate(newDate.createdAt) },
    { title: 'Last Updated', field: 'updatedAt', render: (newDate: User) => formatDate(newDate.updatedAt) },
  ];

  return (
    <div className={styles.content}>
      <div className="mb-4 pb-4">
        <h1>Admin Portal</h1>
        <h2> Users </h2>
        <TableSearch searchTerm={searchTerm} onSearchChange={(value) => setSearchTerm(value)} />
        <ClickableTable
          columns={userColumns}
          data={filteredUsers}
          onRowClick={handleRowClick}
          onRowDelete={handleRowDelete}
          deleteModalRenderer={undefined}
        />
      </div>
    </div>
  );
}

export default Admin;

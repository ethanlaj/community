/* eslint-disable linebreak-style */
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styles from './Contacts.module.css?inline';
import ClickableTable from '../../../shared/components/ClickableTable';
import contactService from '@/services/contactService';

function Contacts() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      let data = await contactService.getAll();

      data = data.map((cont) => {
        const comm = cont.Communication;
        if (!comm) return cont;

        return {
          ...cont,
        };
      });

      setContacts(data);
    };

    fetchContacts();
  }, []);

  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Phone Number', field: 'phone' },
  ];

  const handleRowClick = (row) => {
    alert(`You clicked on ${row.name}`);
  };

  const handleRowDelete = async (row) => {
    const originalContacts = [...contacts];
    try {
      setContacts([...contacts].filter((cont) => cont.id !== row.id));
      await contactService.delete(row.id);

      toast.success('Contact deleted successfully');
    } catch {
      setContacts(originalContacts);
    }
  };

  return (
    <div className={styles.content}>
      <h1>Contacts</h1>
      <ClickableTable
        style={{ width: '20px' }}
        columns={columns}
        data={contacts}
        onRowClick={handleRowClick}
        onRowDelete={handleRowDelete}
      />
    </div>
  );
}

export default Contacts;

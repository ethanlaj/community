import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './Contacts.module.css?inline';
import ClickableTable from '../../../shared/components/ClickableTable';
import contactService from '@/services/contactService';

function Contacts() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      let data = await contactService.getAllTable();

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
    { title: 'First Name', field: 'first_name' },
    { title: 'Last Name', field: 'last_name' },
    { title: 'Organization', field: 'organizationName' },
    { title: 'Email', field: 'email' },
    { title: 'Phone Number', field: 'phone' },
    { title: 'Extension', field: 'exten' },
  ];

  const handleRowClick = (row) => {
    navigate(`/contacts/${row.contactId}`);
  };

  const handleRowDelete = async (row) => {
    const originalContacts = [...contacts];

    try {
      const deletedContactIdentifiers = {
        contactIdIncoming: row.contactId,
        organizationIdIncoming: row.organizationId,
      };
      setContacts([...contacts].filter((cont) => cont.contactId !== row.contactId || cont.organizationId !== row.organizationId));

      await contactService.delete(deletedContactIdentifiers);

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

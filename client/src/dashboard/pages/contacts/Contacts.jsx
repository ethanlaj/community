import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './Contacts.module.css?inline';
import ClickableTable from '../../../shared/components/ClickableTable';
import contactService from '@/services/contactService';

function Contacts() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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
    { title: 'Email', field: 'email' },
    { title: 'Phone Number', field: 'phone' },
    { title: 'Organization', field: 'organizationName' },
    { title: 'Extension', field: 'exten' },
  ];

  const filteredContacts = contacts.filter((contact) => {
    const contactValues = [contact.first_name, contact.last_name];

    if (contactValues.some((value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return true;
    }

    // Check aliases for matches
    if (contact.aliases && contact.aliases.length) {
      return contact.aliases.some((alias) => alias.alias.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    return false;
  });

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

      <div className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="input-group-append">
            <span className="input-group-text">
              <i className="fas fa-search" />
            </span>
          </div>
        </div>
      </div>

      <ClickableTable
        style={{ width: '20px' }}
        columns={columns}
        data={filteredContacts}
        onRowClick={handleRowClick}
        onRowDelete={handleRowDelete}
      />
    </div>
  );
}

export default Contacts;

import { useState, useEffect } from 'react';
import { Alert, Button, Table } from 'react-bootstrap';
import contactService from '@/services/contactService';

function AddContacts({
  form, data, errors, onChange, organizationId,
}) {
  const isChild = form !== undefined;
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    const contactsResult = await (organizationId
      ? contactService.getAllByOrgId(organizationId)
      : contactService.getAll());
    setContacts(contactsResult);
  };

  useEffect(() => {
    fetchContacts();
  }, [organizationId]);

  const handleAddContact = (id, value) => {
    onChange([...data, value]);
  };

  const handleDeleteContact = (contactId) => {
    const updatedContacts = data.filter((contact) => contact.id !== contactId);
    onChange(updatedContacts);
  };

  return (
    <div>
      {!isChild && <h1>Add Contacts</h1>}
      {form.renderSearch(
        'contact',
        contacts.filter((c) => !data.find((d) => d.id === c.id)),
        'id',
        'name',
        null,
        handleAddContact,
        true,
        'Search Contacts',
        fetchContacts,
      )}

      {errors.contacts && <Alert variant="danger">{errors.contacts}</Alert>}
      {data.length > 0 && (
        <Table striped bordered>
          <thead>
            <tr>
              <th>Added Contacts</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((contact) => (
              <tr key={contact.id}>
                <td>{contacts.find((c) => c.id === contact.id)?.name}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteContact(contact.id)}
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

export default AddContacts;

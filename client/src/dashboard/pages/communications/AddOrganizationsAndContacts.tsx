import { Button, Table } from 'react-bootstrap';
import { useEffect } from 'react';
import { Contact } from '@/types/contact';
import { Organization } from '@/types/organization';
import ReactiveSearch from '@/shared/components/ReactiveSearch';

interface AddOrganizationAndContactProps {
  allOrganizations: Organization[];
  allContacts: Contact[];
  organizations: Organization[];
  contacts: Contact[];
  handleChange: (id: string, value: any) => void;
}

// A custom element that allows the user to add organizations and contacts to the database at the same time.
function AddOrganizationAndContact({
  allContacts, allOrganizations, organizations, contacts, handleChange,
}: AddOrganizationAndContactProps) {
  const contactOptions = allContacts.filter((contact) => contacts.find((c) => c.id === contact.id) === undefined);
  const organizationOptions = allOrganizations.filter((organization) => organizations.find((o) => o.id === organization.id) === undefined);

  const handleOrganizationsChange = (value: Organization) => {
    const newOrgs = [...organizations, value];
    handleChange('organizations', newOrgs);
  };

  return (
    <div className="flex gap-8">
      <div className="w-50">
        <ReactiveSearch
          id="organizations"
          items={organizationOptions}
          onChange={(value: Organization) => handleOrganizationsChange(value)}
          valuePath="name"
          resetOnSelect
          headerLabel={undefined}
          selectionLabel="Search Organizations"
          error={undefined}
          onRefresh={undefined}
        />
        <Table striped bordered className="text-center">
          <thead>
            <tr>
              <th>Added Organizations</th>
              <th className="w-25 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {organizations.map((organization) => (
              <tr key={organization.id}>
                <td>{organization.name}</td>
                <td className="w-25">
                  <Button
                    variant="danger"
                  // onClick={() => handleDeleteContact(contact.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="w-50">
        <ReactiveSearch
          id="contacts"
          items={contactOptions}
          onChange={handleChange}
          valuePath="name"
          resetOnSelect
          headerLabel={undefined}
          selectionLabel="Search Contacts"
          error={undefined}
          onRefresh={undefined}
        />
        <Table striped bordered className="text-center">
          <thead>
            <tr>
              <th>Added Contacts</th>
              <th className="w-25">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.name}</td>
                <td className="w-25">
                  <Button
                    variant="danger"
                  // onClick={() => handleDeleteContact(contact.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default AddOrganizationAndContact;

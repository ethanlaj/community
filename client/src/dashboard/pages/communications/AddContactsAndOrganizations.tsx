import { Contact } from '@/types/contact';
import { Organization } from '@/types/organization';
import ReactiveSearchWithTable from './ReactiveSearchWithTable';

interface AddContactsAndOrganizationsProps {
  allOrganizations: Organization[];
  allContacts: Contact[];
  organizations: Organization[];
  contacts: Contact[];
  handleChange: (id: string, value: any) => void;
  organizationsError: string | undefined;
  contactsError: string | undefined;
}

// A custom element that allows the user to add organizations and contacts to the database at the same time.
function AddContactsAndOrganizations({
  allContacts,
  allOrganizations,
  organizations,
  contacts,
  handleChange,
  contactsError,
  organizationsError,
}: AddContactsAndOrganizationsProps) {
  const contactOptions = allContacts.filter((contact) => contacts.find((c) => c.id === contact.id) === undefined);
  const organizationOptions = allOrganizations.filter((organization) => organizations.find((o) => o.id === organization.id) === undefined);
  const autoAddBlacklist: number[] = [];

  const handleOrganizationSelect = (organization: Organization) => {
    const newOrgs = [...organizations, organization];
    handleChange('organizations', newOrgs);
  };

  const handleOrganizationDelete = (id: number) => {
    const newOrgs = organizations.filter((o) => o.id !== id);
    handleChange('organizations', newOrgs);
    autoAddBlacklist.push(id);
  };

  const handleContactSelect = (contact: Contact) => {
    const newContacts = [...contacts, contact];
    handleChange('contacts', newContacts);
  };

  const handleContactDelete = (id: number) => {
    const newContacts = contacts.filter((c) => c.id !== id);
    handleChange('contacts', newContacts);
  };

  return (
    <div className="flex gap-8">
      <ReactiveSearchWithTable
        id="contacts"
        tableHeaderName="Contact"
        selectedItems={contacts}
        options={contactOptions}
        selectionLabel="Select Contacts"
        error={contactsError}
        handleSelect={handleContactSelect}
        handleDelete={handleContactDelete}
      />
      <ReactiveSearchWithTable
        id="organizations"
        tableHeaderName="Organization"
        selectedItems={organizations}
        options={organizationOptions}
        selectionLabel="Select Organizations"
        error={organizationsError}
        handleSelect={handleOrganizationSelect}
        handleDelete={handleOrganizationDelete}
      />
    </div>
  );
}

export default AddContactsAndOrganizations;

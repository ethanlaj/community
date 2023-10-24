import { Organization } from '@/types/organization';
import ContactInfoPerOrganizationForm from './ContactInfoPerOrganizationForm';
import { InfoForOrganization } from './CreateContacts';
import { UseFormReturn } from '@/types/inputTypes';
import { FormProps } from '@/dashboard/pages/contacts/CreateContacts';

export interface Column{
  title: string;
  field: string;
}

interface AddContactsInfoTableProps{
  allOrganizations: Organization[];
  organizations: InfoForOrganization[];
  handleChange: (id: string, value: any) => void;
  organizationsError: string | undefined;
  lowerOrgsErrors: string | undefined;
}

const columns: Column[] = [
  { title: 'Organization', field: 'name' },
  { title: 'Email', field: 'email' },
  { title: 'Phone', field: 'phone' },
];

function AddContactsInfoTable({
  allOrganizations,
  organizations,
  handleChange,
  organizationsError,
  lowerOrgsErrors,
}: AddContactsInfoTableProps) {
  const organizationOptions = allOrganizations.filter((organization) => organizations.find((o) => o.id === organization.id) === undefined);

  const handleOrganizationSelect = (organization: InfoForOrganization) => {
    const newOrgs = [...organizations, organization];

    handleChange('infoPerOrganization', newOrgs);
  };

  const handleOrganizationDelete = (id: number, rowIndex:number) => {
    const newOrgs = organizations.filter((o) => o.id !== id);

    handleChange('infoPerOrganization', newOrgs);
    handleDelete(rowIndex);
  };

  const handleDelete = (rowIndex:number) => {
    const updatedData = organizations.filter((_, index) => index !== rowIndex);

    handleChange('infoPerOrganization', updatedData);
  };

  const handleUpdate = (orgs: InfoForOrganization) => {
    handleChange('infoPerOrganization', orgs);
  };

  return (
    <div>
      <ContactInfoPerOrganizationForm
        id="infoPerOrganization"
        selectOrgsData={organizations}
        columns={columns}
        options={organizationOptions}
        selectionLabel="Select Organizations"
        error={organizationsError}
        lowerOrgsErrors={lowerOrgsErrors}
        handleSelect={handleOrganizationSelect}
        handleDelete={handleOrganizationDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default AddContactsInfoTable;

import { Organization } from '@/types/organization';
import ContactInfoPerOrganizationForm from './ContactInfoPerOrganizationForm';
import { InfoForOrganization } from './CreateContacts';
import { UseFormReturn } from '@/types/inputTypes';
import { FormProps } from '@/dashboard/pages/contacts/CreateContacts';

interface Column {
  title: string;
  field: string;
}

interface AddContactsInfoTableProps{
  allOrganizations: Organization[];
  organizations: InfoForOrganization[];
  form: UseFormReturn<FormProps>;
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
  form,
  handleChange,
  organizationsError,
  lowerOrgsErrors,
}: AddContactsInfoTableProps) {
  const organizationOptions = allOrganizations.filter((organization) => organizations.find((o) => o.id === organization.id) === undefined);

  const handleOrganizationSelect = (organization: InfoForOrganization) => {
    const newOrgs = [...organizations, organization];

    handleChange('InfoPerOrganization', newOrgs);
  };

  const handleOrganizationDelete = (id: number, rowIndex:number) => {
    const newOrgs = organizations.filter((o) => o.id !== id);

    handleChange('InfoPerOrganization', newOrgs);
    handleDelete(rowIndex);
  };

  const handleDelete = (rowIndex:number) => {
    const updatedData = organizations.filter((_, index) => index !== rowIndex);

    handleChange('InfoPerOrganization', updatedData);
  };

  const handleUpdate = (orgs: InfoForOrganization) => {
    handleChange('InfoPerOrganization', orgs);
  };

  return (
    <div>
      <ContactInfoPerOrganizationForm
        id="InfoPerOrganization"
        selectOrgsData={form.data.infoPerOrganization}
        columns={columns}
        options={organizationOptions}
        selectionLabel="Select Organizations"
        error={organizationsError}
        LowerOrgsErrors={lowerOrgsErrors}
        handleSelect={handleOrganizationSelect}
        handleDelete={handleOrganizationDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default AddContactsInfoTable;

import { Organization } from '@/types/organization';
import ReactiveSearchWithTableWithEmailPhone from './ReactiveSearchWithTableWithEmailPhone';
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

const columns: column[] = [
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
  LowerOrgsErrors,
}: AddContactsInfoTableProps) {
  const organizationOptions = allOrganizations.filter((organization) => organizations.find((o) => o.id === organization.id) === undefined);

  const handleOrganizationSelect = (organization: InfoForOrganization) => {
    console.log(organization);
    const newOrgs = [...organizations, organization];
    console.log(newOrgs);
    handleChange('InfoPerOrganization', newOrgs);
  };

  const handleOrganizationDelete = (id: number, rowIndex:number) => {
    const newOrgs = organizations.filter((o) => o.id !== id);
    console.log(newOrgs);
    handleChange('InfoPerOrganization', newOrgs);
    handleDelete(rowIndex);
  };

  const handleDelete = (rowIndex:number) => {
    const updatedData = organizations.filter((_, index) => index !== rowIndex);
    console.log(updatedData);
    handleChange('InfoPerOrganization', updatedData);
  };

  const handleUpdate = (orgs: InfoForOrganization) => {
    console.log(orgs);
    console.log(LowerOrgsErrors);
    handleChange('InfoPerOrganization', orgs);
  };

  return (
    <div>
      <ReactiveSearchWithTableWithEmailPhone
        id="InfoPerOrganization"
        selectOrgsData={form.data.InfoPerOrganization}
        columns={columns}
        form={form}
        options={organizationOptions}
        selectionLabel="Select Organizations"
        error={organizationsError}
        LowerOrgsErrors={LowerOrgsErrors}
        handleSelect={handleOrganizationSelect}
        handleDelete={handleOrganizationDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default AddContactsInfoTable;

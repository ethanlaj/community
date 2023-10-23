import { Organization } from '@/types/organization';
import ReactiveSearchWithTableWithEmailPhone from './ReactiveSearchWithTableWithEmailPhone';

export interface InfoForOrganization {
  id: number,
  name: string;
  email: string,
  phone: string,
}

interface AddContactsInfoTableProps{
  allOrganizations: Organization[];
  organizations: InfoForOrganization[];
  form: any;
  handleChange: (id: string, value: any) => void;
  organizationsError: string | undefined;
}

function AddContactsInfoTable({
  allOrganizations,
  organizations,
  form,
  handleChange,
  organizationsError,
}:AddContactsInfoTableProps) {
  const organizationOptions = allOrganizations.filter((organization) => organizations.find((o) => o.id === organization.id) === undefined);

  const handleOrganizationSelect = (organization: Organization) => {
    const newOrgs = [...organizations, organization];
    handleChange('organizations', newOrgs);
  };

  const handleOrganizationDelete = (id: number) => {
    const newOrgs = organizations.filter((o) => o.id !== id);
    handleChange('organizations', newOrgs);
  };

  return (
    <div>
      <p>AddContactsInfoTable</p>
      <ReactiveSearchWithTableWithEmailPhone
        id="organizations"
        tableHeaderName="Organization"
        selectedItems={organizations}
        form={form}
        options={organizationOptions}
        selectionLabel="Select Organizations"
        error={organizationsError}
        handleSelect={handleOrganizationSelect}
        handleDelete={handleOrganizationDelete}
      />
    </div>
  );
}

export default AddContactsInfoTable;

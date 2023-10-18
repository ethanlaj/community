import { useState, useEffect } from 'react';
import organizationService from '@/services/organizationService';

function AddOrganization({ form, onChange }) {
  const isChild = form !== undefined;
  const [organizations, setOrganization] = useState([]);

  const fetchOrganization = async () => {
    const organizationsResult = await organizationService.getAll();

    setOrganization(organizationsResult);
    if (form.data.organization) handleChange(null);
  };

  useEffect(() => {
    fetchOrganization();
  }, []);

  const handleChange = (_id, value) => {
    onChange(value);
  };

  return (
    <div>
      {!isChild && <h1>Add Organization</h1>}
      {form.renderSearch({
        id: 'organization',
        items: organizations,
        keyPath: 'id',
        valuePath: 'name',
        handleChange,
        selectionLabel: 'Search Organizations',
        onRefresh: fetchOrganization,
      })}
    </div>
  );
}

export default AddOrganization;

import { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import locationService from '@/services/locationService';

function AddLocation({
  form, errors, onChange, organizationId, organizations,
}) {
  const isChild = form !== undefined;
  const [organizationFilter, setOrganizationFilter] = useState(organizationId);
  const [locations, setLocation] = useState([]);

  const fetchLocation = async () => {
    const locationsResult = await (organizationFilter
      ? locationService.getAllByOrgId(organizationFilter)
      : locationService.getAll());

    setLocation(locationsResult);
    handleChange(null);
  };

  useEffect(() => {
    fetchLocation();
    handleChange(null);
  }, [organizationFilter]);

  const handleChange = (_id, value) => {
    onChange(value);
  };

  return (
    <div>
      {!isChild && <h1>Add Location</h1>}
      {!organizationId && form.renderSearch({
        id: 'organizationFilter',
        items: organizations,
        keyPath: 'id',
        valuePath: 'name',
        handleChange: (_id, organization) => { setOrganizationFilter(organization.id); },
        selectionLabel: 'Filter by Organization',
        onRefresh: fetchLocation,
      })}
      {organizationFilter
      && form.renderSearch({
        id: 'location',
        items: locations,
        keyPath: 'id',
        valuePath: 'name',
        handleChange,
        selectionLabel: 'Search Locations',
        onRefresh: fetchLocation,
      })}

      {errors.locations && <Alert variant="danger">{errors.locations}</Alert>}
    </div>
  );
}

export default AddLocation;

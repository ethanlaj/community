import { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import locationService from '@/services/locationService';
import { UseFormReturn } from '@/types/inputTypes';
import { Organization } from '@/types/organization';

interface FormProps {
  location: Location;
}

interface AddLocationProps {
  form: UseFormReturn<FormProps>;
  errors: UseFormReturn<FormProps>['errors'];
  onChange: (value: any) => void;
  organizationId?: number;
  organizations: Organization[];
}

function AddLocation({
  form,
  errors,
  onChange: handleChange,
  organizationId,
  organizations,
}: AddLocationProps) {
  const isChild = form !== undefined;
  const [organizationFilter, setOrganizationFilter] = useState(organizationId);
  const [locations, setLocation] = useState([]);

  const fetchLocation = async () => {
    const locationsResult = await (organizationFilter
      ? locationService.getAllByOrgId(organizationFilter)
      : locationService.getAll());

    setLocation(locationsResult);
  };

  useEffect(() => {
    fetchLocation();
    handleChange(null);
  }, [organizationFilter]);

  useEffect(() => {
    if (!organizationFilter) {
      setOrganizationFilter(organizationId);
    }
  }, [organizationId]);

  return (
    <div>
      {!isChild && <h1>Add Location</h1>}
      {!organizationId && form.renderSearch({
        id: 'organizationFilter',
        items: organizations,
        keyPath: 'id',
        valuePath: 'name',
        handleChange: (_id, organization: Organization) => { setOrganizationFilter(organization.id); },
        selectionLabel: 'Filter by Organization',
        onRefresh: fetchLocation,
      })}
      {organizationFilter
      && form.renderSearch({
        id: 'location',
        items: locations,
        keyPath: 'id',
        valuePath: 'name',
        handleChange: (_id, location: Location) => { handleChange(location); },
        selectionLabel: 'Search Locations',
        onRefresh: fetchLocation,
      })}

      {errors.location && <Alert variant="danger">{errors.location}</Alert>}
    </div>
  );
}

export default AddLocation;

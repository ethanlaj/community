import { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import locationService from '@/services/locationService';
import { Organization } from '@/types/organization';
import { Location } from '@/types/location';
import ReactiveSearch from '@/shared/components/ReactiveSearch';

interface AddLocationProps {
  location: Location | null;
  error?: string;
  handleChange: (value: Location | null) => void;
  organizationId?: number;
  organizations: Organization[];
}

function AddLocation({
  location,
  error,
  handleChange,
  organizationId,
  organizations,
}: AddLocationProps) {
  const [organizationFilter, setOrganizationFilter] = useState<Organization | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);

  const fetchLocation = async () => {
    const locationsResult = await (organizationFilter
      ? locationService.getAllByOrgId(organizationFilter.id)
      : locationService.getAll());

    setLocations(locationsResult);
  };

  useEffect(() => {
    fetchLocation();

    if (location && organizationFilter && location.organizationId !== organizationFilter.id) {
      handleChange(null);
    }
  }, [organizationFilter]);

  useEffect(() => {
    if (!organizationFilter) {
      const found = organizations.find((org) => org.id === organizationId);
      setOrganizationFilter(found || null);
    }
  }, [organizationId]);

  return (
    <div>
      <ReactiveSearch
        id="organizationFilter"
        items={organizations}
        headerLabel={undefined}
        resetOnSelect={false}
        selectionLabel="Filter by Organization"
        idPath="id"
        valuePath="name"
        value={organizationFilter}
        error={undefined}
        onRefresh={undefined}
        onChange={(selOrganization: Organization) => { setOrganizationFilter(selOrganization); }}
      />
      <ReactiveSearch
        id="location"
        items={locations}
        headerLabel={undefined}
        resetOnSelect={false}
        selectionLabel="Search Locations"
        idPath="id"
        valuePath="name"
        value={location}
        error={undefined}
        onRefresh={fetchLocation}
        onChange={(newLocation: Location) => { handleChange(newLocation); }}
      />

      {error && <Alert variant="danger">{error}</Alert>}
    </div>
  );
}

export default AddLocation;

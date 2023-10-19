import { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import locationService from '@/services/locationService';

function AddLocation({
  form, errors, onChange, organizationId,
}) {
  const isChild = form !== undefined;
  const [locations, setLocation] = useState([]);

  const fetchLocation = async () => {
    const locationsResult = await (organizationId
      ? locationService.getAllByOrgId(organizationId)
      : locationService.getAll());

    setLocation(locationsResult);
    handleChange(null);
  };

  useEffect(() => {
    fetchLocation();
  }, [organizationId]);

  const handleChange = (id, value) => {
    onChange(value);
  };

  return (
    <div>
      {!isChild && <h1>Add Location</h1>}
      {form.renderSearch({
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

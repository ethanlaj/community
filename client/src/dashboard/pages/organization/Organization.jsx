import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { format } from 'date-fns';
import styles from './Organization.module.css';
import organizationService from '@/services/organizationService';
import ClickableTable from '@/shared/components/ClickableTable';

function Organization() {
  const [organization, setOrganization] = useState({});
  const { id } = useParams();
  const formatDate = (date) => (date ? format(new Date(date), 'PPpp') : '');

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const data = await organizationService.getById(id);
        setOrganization(data);
      } catch (error) {
        toast.error('Failed to fetch organization details');
        console.error('Error fetching organization details:', error);
      }
    };

    if (id) {
      fetchOrganization();
    }
  }, [id]);

  const handleRowClick = (row) => {
    // TODO: implement click functionality
  };

  const locationColumns = [
    { title: 'Address', field: 'address' },
    { title: 'Name', field: 'name' },
    { title: 'Created At', field: 'createdAt', render: (location) => formatDate(location.createdAt) },
    { title: 'Last Updated', field: 'updatedAt', render: (location) => formatDate(location.updatedAt) },
  ];

  const contactColumns = [
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Phone', field: 'phone' },
    { title: 'Created At', field: 'createdAt', render: (contact) => formatDate(contact.createdAt) },
    { title: 'Last Updated', field: 'updatedAt', render: (contact) => formatDate(contact.updatedAt) },
  ];

  const communicationColumns = [
    { title: 'Date', field: 'date' },
    { title: 'Type', field: 'type' },
    { title: 'Note', field: 'note' },
    { title: 'Created At', field: 'createdAt', render: (communication) => formatDate(communication.createdAt) },
    { title: 'Last Updated', field: 'updatedAt', render: (communication) => formatDate(communication.updatedAt) },
  ];

  return (
    <div className={styles.content}>
      <h1>{organization.name}</h1>
      <div className="mb-4 pb-4">
        <h4>Locations</h4>
        <ClickableTable
          columns={locationColumns}
          data={organization.organizationLocations || []}
          onRowClick={handleRowClick}
        />
      </div>
      <div className="mb-4 pb-4">
        <h4>Contacts</h4>
        <ClickableTable
          columns={contactColumns}
          data={organization.contacts || []}
          onRowClick={handleRowClick}
        />
      </div>
      <div className="mb-4 pb-4">
        <h4>Recent Communications</h4>
        <ClickableTable
          columns={communicationColumns}
          data={organization.communications || []}
          onRowClick={handleRowClick}
        />
      </div>
    </div>
  );
}

export default Organization;

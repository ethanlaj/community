import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { FaFileExcel } from 'react-icons/fa';
import exportToExcel from '../../../utils/excelExport';
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

  const handleRowClick = () => {
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

  const exportData = (dataToMap, columns, fileName) => {
    const dataToExport = dataToMap.map((item) => {
      const exportRow = {};
      columns.forEach((column) => {
        exportRow[column.title] = column.render ? column.render(item) : item[column.field];
      });
      return exportRow;
    });
    exportToExcel(dataToExport, fileName);
  };

  const handleExportLocations = () => {
    exportData(organization.organizationLocations, locationColumns, 'Organization_Locations');
  };

  const handleExportContacts = () => {
    exportData(organization.contacts, contactColumns, 'Organization_Contacts');
  };

  const handleExportCommunications = () => {
    exportData(organization.communications, communicationColumns, 'Organization_Communications');
  };

  const handleExportAll = () => {
    exportToExcel([
      { name: 'Locations', data: organization.organizationLocations.map(mapData(locationColumns)) },
      { name: 'Contacts', data: organization.contacts.map(mapData(contactColumns)) },
      { name: 'Communications', data: organization.communications.map(mapData(communicationColumns)) },
    ], 'Organization_Data');
  };

  const mapData = (columns) => (item) => {
    const exportRow = {};
    columns.forEach((column) => {
      exportRow[column.title] = column.render ? column.render(item) : item[column.field];
    });
    return exportRow;
  };

  return (
    <div className={styles.content}>
      <h1>{organization.name}</h1>
      <div className="mb-4 pb-4">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h4 className="mb-0">Locations</h4>
          <button type="button" className="btn btn-success" onClick={handleExportLocations}>
            {' '}
            <FaFileExcel />
            {' '}
            Export

          </button>
        </div>
        <ClickableTable
          columns={locationColumns}
          data={organization.organizationLocations || []}
          onRowClick={handleRowClick}
        />

      </div>

      <div className="mb-4 pb-4">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h4 className="mb-0">Contacts</h4>
          <button type="button" className="btn btn-success" onClick={handleExportContacts}>
            {' '}
            <FaFileExcel />
            {' '}
            Export

          </button>
        </div>
        <ClickableTable
          columns={contactColumns}
          data={organization.contacts || []}
          onRowClick={handleRowClick}
        />

      </div>

      <div className="mb-4 pb-4">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h4 className="mb-0">Recent Communications</h4>
          <button type="button" className="btn btn-success" onClick={handleExportCommunications}>
            {' '}
            <FaFileExcel />
            {' '}
            Export

          </button>
        </div>
        <ClickableTable
          columns={communicationColumns}
          data={organization.communications || []}
          onRowClick={handleRowClick}
        />

      </div>

      <button type="button" className="btn btn-success" onClick={handleExportAll}>
        <FaFileExcel />
        {' '}
        Export All
      </button>
    </div>
  );
}

export default Organization;

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { FaPencilAlt } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import Button from 'react-bootstrap/Button';
import exportToExcel from '../../../utils/excelExport';
import organizationService from '@/services/organizationService';
import ClickableTable from '@/shared/components/ClickableTable';
import ExcelExportButton from '../../../shared/components/ExcelExportButton';
import Loading from '@/shared/components/Loading';
import ProtectedElement from '@/shared/components/ProtectedElement';

function Organization() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [organization, setOrganization] = useState({});
  const { id } = useParams();
  const formatDate = (date) => (date ? format(new Date(date), 'PPpp') : '');

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const data = await organizationService.getById(id);
        setOrganization(data);
        setIsLoading(false);
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

  const goToUpdate = () => navigate(`/organization/${organization.id}/edit`);
  const goBack = () => navigate('/organizations');

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="relative w-full mb-4">
        <Button variant="outline-secondary" className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center gap-1" onClick={goBack}>
          <IoIosArrowBack />
          Organizations
        </Button>
        <div className="flex justify-center items-center h-full">
          <h1 className="flex items-center justify-center gap-3 mb-0">
            {organization.name}
            <ProtectedElement minLevel={2}>
              <Button variant="outline-primary" className="inline-flex items-center gap-1" onClick={goToUpdate}>
                <FaPencilAlt />
                Update
              </Button>
            </ProtectedElement>
          </h1>
        </div>
      </div>
      <div className="mb-4 pb-4">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h4 className="mb-0">Locations</h4>
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
        </div>
        <ClickableTable
          columns={communicationColumns}
          data={organization.communications || []}
          onRowClick={handleRowClick}
        />

      </div>

      <ExcelExportButton onExport={handleExportAll}>
        Export All
      </ExcelExportButton>
    </div>
  );
}

export default Organization;

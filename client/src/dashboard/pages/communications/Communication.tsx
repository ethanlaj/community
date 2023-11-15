import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { FaPencilAlt } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import Button from 'react-bootstrap/Button';
import ClickableTable from '@/shared/components/ClickableTable';
import Loading from '@/shared/components/Loading';
import ProtectedElement from '@/shared/components/ProtectedElement';
import CommunicationService from '@/services/communicationService';
import { Communication as CommunicationType } from '@/types/communication';
import CommunicationCard from './CommunicationCard';
import { Organization } from '@/types/organization';

function Communication() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [communication, setCommunication] = useState<CommunicationType | null>(null);
  const { id } = useParams();
  const communicationId = id ? parseInt(id, 10) : null;
  const formatDate = (date?: string) => (date ? format(new Date(date), 'PP') : '');

  useEffect(() => {
    const fetchCommunication = async () => {
      try {
        const data = await CommunicationService.getById(communicationId!);
        setCommunication(data);
        setIsLoading(false);
      } catch (error) {
        toast.error('Failed to fetch communication details');
        console.error('Error fetching communication details:', error);
      }
    };

    if (id) {
      fetchCommunication();
    }
  }, [id]);

  const organizationsColumns = [
    { title: 'Name', field: 'name' },
  ];

  const contactsColumns = [
    { title: 'Name', field: 'name' },
  ];

  const usersColumns = [
    { title: 'Name', field: 'name' },
    { title: 'Office', field: 'office.name' },
  ];

  const handleRowClick = (row: Organization) => navigate(`/organization/${row.id}`);
  const goToUpdate = () => navigate(`/communications/${communication?.id}/edit`);
  const goBack = () => navigate('/communications');

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="relative w-full mb-4">
        <Button variant="outline-secondary" className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center gap-1" onClick={goBack}>
          <IoIosArrowBack />
          Communications
        </Button>
        <div className="flex justify-center items-center h-full">
          <h1 className="flex items-center justify-center gap-3 mb-0">
            Communication Details
            <ProtectedElement minLevel={2}>
              <Button variant="outline-primary" className="inline-flex items-center gap-1" onClick={goToUpdate}>
                <FaPencilAlt />
                Update
              </Button>
            </ProtectedElement>
          </h1>
        </div>
      </div>

      <CommunicationCard
        date={formatDate(communication?.date)}
        note={communication?.note || ''}
        type={communication?.type || ''}
        location={{
          organization: communication?.organizationLocation.organization.name || '',
          name: communication?.organizationLocation.name || '',
          address: communication?.organizationLocation.address || '',
        }}
      />

      <div className="mb-4">
        <h4 className="mb-2">Organizations</h4>
        <ClickableTable
          columns={organizationsColumns}
          data={communication?.organizations || []}
          onRowClick={handleRowClick}
          onRowDelete={undefined}
          deleteModalRenderer={undefined}
        />
      </div>

      <div className="mb-4">
        <h4 className="mb-2">Contacts</h4>
        <ClickableTable
          columns={contactsColumns}
          data={communication?.contacts || []}
          onRowClick={undefined}
          onRowDelete={undefined}
          deleteModalRenderer={undefined}
        />
      </div>

      <div className="mb-4">
        <h4 className="mb-2">Users</h4>
        <ClickableTable
          columns={usersColumns}
          data={communication?.users || []}
          onRowClick={undefined}
          onRowDelete={undefined}
          deleteModalRenderer={undefined}
        />
      </div>
    </div>
  );
}

export default Communication;

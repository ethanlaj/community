import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import ClickableTable from '@/shared/components/ClickableTable';
import Loading from '@/shared/components/Loading';
import CommunicationService from '@/services/communicationService';
import { Communication as CommunicationType } from '@/types/communication';
import CommunicationCard from './CommunicationCard';
import { Organization } from '@/types/organization';
import formatDate from '@/utils/formatDate';
import UpdateButton from '@/shared/components/UpdateButton';
import BackButton from '@/shared/components/BackButton';
import { Contact } from '@/types/contact';

function Communication() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [communication, setCommunication] = useState<CommunicationType | null>(null);
  const { id } = useParams();
  const communicationId = id ? parseInt(id, 10) : null;

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
  }, []);

  const organizationsColumns = [
    { title: 'Name', field: 'name' },
  ];

  const contactsColumns = [
    { title: 'First Name', field: 'first_name' },
    { title: 'Last Name', field: 'last_name' },
  ];

  const usersColumns = [
    { title: 'Name', field: 'name' },
    { title: 'Office', field: 'office.name' },
  ];

  const handleContactRowClick = (row: Contact) => navigate(`/contacts/${row.id}`);
  const handleOrgRowClick = (row: Organization) => navigate(`/organization/${row.id}`);
  const goToUpdate = () => navigate(`/communications/${communication?.id}/edit`);
  const goBack = () => navigate('/communications');

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="relative w-full mb-4">
        <BackButton handleClick={goBack}>Communications</BackButton>
        <div className="flex justify-center items-center h-full">
          <h1 className="flex items-center justify-center mb-0">
            Communication Details
            <UpdateButton handleClick={goToUpdate} />
          </h1>
        </div>
      </div>

      <CommunicationCard
        date={formatDate(communication?.date)}
        note={communication?.note || ''}
        type={communication?.type || ''}
        location={{
          organization: communication?.organizationLocation?.organization?.name || '',
          name: communication?.organizationLocation?.name || '',
          address: communication?.organizationLocation?.address || '',
        }}
      />

      <div className="mb-4">
        <h4 className="mb-2">Organizations</h4>
        <ClickableTable
          columns={organizationsColumns}
          data={communication?.organizations || []}
          onRowClick={handleOrgRowClick}
          onRowDelete={undefined}
          deleteModalRenderer={undefined}
        />
      </div>

      <div className="mb-4">
        <h4 className="mb-2">Contacts</h4>
        <ClickableTable
          columns={contactsColumns}
          data={communication?.contacts || []}
          onRowClick={handleContactRowClick}
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

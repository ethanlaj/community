import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import ClickableTable from '@/shared/components/ClickableTable';
import Loading from '@/shared/components/Loading';
import { Communication, Communication as CommunicationType } from '@/types/communication';
import formatDate from '@/utils/formatDate';
import UpdateButton from '@/shared/components/UpdateButton';
import BackButton from '@/shared/components/BackButton';
import { Contact as ContactType, OrganizationContact } from '@/types/contact';
import ContactService from '@/services/contactService';
import ContactCard from './ContactCard';

function Contact() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [contact, setContact] = useState<ContactType | null>(null);
  const { id } = useParams();
  const contactId = id ? parseInt(id, 10) : null;

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await ContactService.getById(contactId!);

        const mappedData = {
          ...data,
          communications: data.communications.map((comm: CommunicationType) => ({
            ...comm,
            date: formatDate(comm.date),
          })),
          organizationContacts: data.organizationContacts.map((org: OrganizationContact) => {
            const matchingOrg = data.organizations.find((o) => o.id === org.organizationId);

            return {
              ...org,
              name: matchingOrg?.name || '',
            };
          }),
        };

        setContact(mappedData);

        setIsLoading(false);
      } catch (error) {
        toast.error('Failed to fetch contact details');
        console.error('Error fetching contact details:', error);
      }
    };

    if (id) {
      fetchContact();
    }
  }, []);

  const organizationsColumns = [
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Phone', field: 'phone' },
    { title: 'Extension', field: 'exten' },
  ];

  const communicationColumns = [
    { title: 'Date', field: 'date' },
    { title: 'Type', field: 'type' },
    { title: 'Note', field: 'note' },
  ];

  const handleOrgRowClick = (row: OrganizationContact) => navigate(`/organization/${row.organizationId}`);
  const handleCommRowClick = (row: Communication) => navigate(`/communications/${row.id}`);
  const goToUpdate = () => navigate(`/contacts/${contact?.id}/edit`);
  const goBack = () => navigate('/contacts');

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="relative w-full mb-4">
        <BackButton handleClick={goBack}>Contacts</BackButton>
        <div className="flex justify-center items-center h-full">
          <h1 className="flex items-center justify-center mb-0">
            {`${contact?.first_name} ${contact?.last_name}`}
            <UpdateButton handleClick={goToUpdate} />
          </h1>
        </div>
      </div>

      <ContactCard
        firstName={contact?.first_name || ''}
        lastName={contact?.last_name || ''}
      />

      <div className="mb-4">
        <h4 className="mb-2">Organizations</h4>
        <ClickableTable
          columns={organizationsColumns}
          data={contact?.organizationContacts || []}
          onRowClick={handleOrgRowClick}
          onRowDelete={undefined}
          deleteModalRenderer={undefined}
        />
      </div>

      <div className="mb-4">
        <h4 className="mb-2">Communications</h4>
        <ClickableTable
          columns={communicationColumns}
          data={contact?.communications || []}
          onRowClick={handleCommRowClick}
          onRowDelete={undefined}
          deleteModalRenderer={undefined}
        />
      </div>
    </div>
  );
}

export default Contact;

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Joi from 'joi';
import useForm from '@/shared/hooks/useForm';
import AddLocation from '@/dashboard/pages/organizations/AddLocation';
import CommunicationService from '@/services/communicationService';
import { RenderSelectOption } from '@/types/inputTypes';
import OrganizationService from '@/services/organizationService';
import ContactService from '@/services/contactService';
import AddContactsAndOrganizations from './AddContactsAndOrganizations';
import { Contact } from '@/types/contact';
import { Organization } from '@/types/organization';
import { Location } from '@/types/location';
import { ComUser, User } from '@/types/user';
import AddUserTable from './addUserTable';
import UserService from '@/services/userService';
import Loading from '@/shared/components/Loading';
import { Communication } from '@/types/communication';
import formatDate from '@/utils/formatDate';

interface FormProps {
  date: string;
  type: string;
  contacts: Contact[];
  users: User[];
  note: string;
  organizationLocation: Location | null;
  organizations: Organization[];
}

const typeOptions: RenderSelectOption[] = [
  { value: 'email', name: 'Email' },
  { value: 'phone', name: 'Phone' },
  { value: 'in-person', name: 'In-Person' },
  { value: 'mail', name: 'Mail' },
];

function CreateUpdateCommunication() {
  const navigate = useNavigate();
  const { id } = useParams();
  const now = new Date();
  let communicationId = id ? parseInt(id, 10) : undefined;
  const isUpdateMode = communicationId !== undefined;
  const [originalCommunication, setOriginalCommunication] = useState<Communication | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [allOrganizations, setAllOrganizations] = useState<Organization[]>([]);
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [allUsers, setAllUsers] = useState<ComUser[]>([]);

  const fields: FormProps = {
    type: '',
    date: formatDate(now),
    contacts: [],
    users: [],
    note: '',
    organizationLocation: null,
    organizations: [],
  };

  const schema = Joi.object({
    date: Joi.date().required().label('Date').max(now)
      .messages({
        'date.max': 'Date must be a non-future date.',
      }),
    contacts: Joi.array()
      .items(Joi.object().label('Contact'))
      .label('Contacts')
      .required(),
    users: Joi.array()
      .items(Joi.object().label('User'))
      .label('Users')
      .required(),
    note: Joi.string().allow('').label('Note'),
    locationId: Joi.number().allow(null).label('Location ID'),
    organizationLocation: Joi.object().allow(null).label('Location'),
    organizations: Joi.array()
      .items(Joi.object().label('Organization'))
      .label('Organizations')
      .min(1)
      .required(),
    type: Joi.string().allow('email', 'phone', 'in-person', 'mail').label('Type').required()
      .messages({
        'string.empty': 'Please select a type',
      }),
  });

  const doSubmit = async () => {
    try {
      const {
        date, contacts, users, note, organizationLocation, organizations, type,
      } = form.data;

      const communication = {
        date,
        type,
        note,
        locationId: organizationLocation?.id,
        organizationIds: organizations?.map((o) => o.id),
        contactIds: contacts.map((c) => c.id),
        userIds: users.map((u) => u.id),
      };

      if (isUpdateMode) {
        await CommunicationService.update(communicationId!, communication);
      } else {
        const newCommunication = await CommunicationService.create(communication);
        communicationId = newCommunication.id;
      }

      navigate(`/communications/${communicationId}`, { replace: true });
    } catch (ex) {
      toast.error('An unexpected error occurred.');
    }
  };

  const form = useForm<FormProps>({ fields, schema, doSubmit });

  useEffect(() => {
    // Fetch all data needed
    async function fetchRequiredData() {
      try {
        const promises = [
          OrganizationService.getAll(),
          ContactService.getAll(),
          UserService.getAll(),
        ];

        if (isUpdateMode) {
          promises.push(loadCommunicationData(communicationId!));
        }

        const [allOrganizationsResponse, allContactsResponse, allUsersResponse] = await Promise.all(promises);

        setAllOrganizations(allOrganizationsResponse);
        setAllContacts(allContactsResponse);
        setAllUsers(allUsersResponse);

        setIsLoading(false);
      } catch (ex) {
        toast.error('An unexpected error occurred.');
      }
    }

    fetchRequiredData();
  }, [id]);

  const loadCommunicationData = async (commId: number) => {
    const communication = await CommunicationService.getById(commId);

    const formattedDate = formatDate(communication.date);

    form.setData({
      date: formattedDate,
      type: communication.type,
      note: communication.note,
      contacts: communication.contacts,
      users: communication.users,
      organizationLocation: communication.organizationLocation,
      organizations: communication.organizations,
    });

    setOriginalCommunication(communication);
  };

  const getOrgIdFilterForAddLocation = () => {
    if (originalCommunication?.organizationLocation) {
      return originalCommunication.organizationLocation.organizationId;
    }
    if (form.data.organizations.length === 1) {
      return form.data.organizations[0].id;
    }
    return undefined;
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>
        {isUpdateMode ? 'Update' : 'Create'}
        {' '}
        Communication
      </h1>
      <form className="m-auto w-70p">
        {form.renderInput({ id: 'date', label: 'Date', type: 'date' })}
        {form.renderInput({ id: 'note', label: 'Note', type: 'textarea' })}
        {form.renderSelect('type', 'Type', typeOptions)}

        <div>
          <h3>Contacts and Organizations</h3>
          <p>
            Which contacts were a part of this communication? Organizations will automatically be added for you.
          </p>
          <AddContactsAndOrganizations
            organizations={form.data.organizations}
            contacts={form.data.contacts}
            allContacts={allContacts}
            allOrganizations={allOrganizations}
            handleChange={form.handleDataChange}
            organizationsError={form.errors.organizations}
            contactsError={form.errors.contacts}
          />

          <h3>Location</h3>
          <AddLocation
            error={form.errors.organizationLocation}
            handleChange={(value) => form.handleDataChange('organizationLocation', value)}
            location={form.data.organizationLocation}
            organizationId={getOrgIdFilterForAddLocation()}
            organizations={form.data.organizations}
          />

          <h3>Users</h3>
          <p>
            Which Elizabethtown College staff were a part of this communication?
          </p>
          <AddUserTable
            users={form.data.users}
            allUsers={allUsers}
            handleChange={form.handleDataChange}
            UsersError={form.errors.users}
          />
        </div>

        {form.renderButton(isUpdateMode ? 'Update' : 'Create')}
      </form>
    </div>
  );
}

export default CreateUpdateCommunication;

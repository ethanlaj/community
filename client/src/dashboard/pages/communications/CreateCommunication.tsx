import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { ComUser } from '@/types/user';
import AddUserTable from './addUserTable';
import UserService from '@/services/userService';

interface FormProps {
  date: string;
  type: string;
  contacts: Contact[];
  users: {
    id: number;
    name: string;
    email: string;
    phone: string;
  }[];
  note: string;
  location: Location | null;
  organizations: Organization[];
}

const typeOptions: RenderSelectOption[] = [
  { value: 'email', name: 'Email' },
  { value: 'phone', name: 'Phone' },
  { value: 'in-person', name: 'In-Person' },
  { value: 'mail', name: 'Mail' },
];

function CreateCommunication() {
  const navigate = useNavigate();
  const now = new Date();
  const timeZoneOffset = now.getTimezoneOffset();
  const nowLocal = new Date(now.getTime() - timeZoneOffset * 60 * 1000);
  const [allOrganizations, setAllOrganizations] = useState<Organization[]>([]);
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [allUsers, setAllUsers] = useState<ComUser[]>([]);

  const fields = {
    type: '',
    date: nowLocal.toISOString().substr(0, 10),
    contacts: [],
    users: [],
    note: '',
    location: null,
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
    location: Joi.object().allow(null).label('Location'),
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
        date, contacts, users, note, location, organizations, type,
      } = form.data;

      const communication = {
        date,
        type,
        note,
        locationId: location?.id,
        organizationIds: organizations?.map((o) => o.id),
        contactIds: contacts.map((c) => c.id),
        userIds: users.map((u) => u.id),
      };

      await CommunicationService.create(communication);
      navigate('/communications', { replace: true });
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

        const [allOrganizationsResponse, allContactsResponse, allUsersResponse] = await Promise.all(promises);

        setAllOrganizations(allOrganizationsResponse);
        setAllContacts(allContactsResponse);
        setAllUsers(allUsersResponse);
      } catch (ex) {
        toast.error('An unexpected error occurred.');
      }
    }

    fetchRequiredData();
  }, []);

  return (
    <div>
      <h1>Create Communication</h1>
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
          {form.renderChildForm(form, 'location', AddLocation, form.data.location, {
            organizationId: form.data.organizations.length === 1
              ? form.data.organizations[0].id
              : undefined,
            organizations: form.data.organizations,
          })}

          <h3>Add Users</h3>
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

        {form.renderButton('Create')}
      </form>
    </div>
  );
}

export default CreateCommunication;

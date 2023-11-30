/* eslint-disable newline-per-chained-call */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Joi from 'joi';
import { toast } from 'react-toastify';
import { Form } from 'react-bootstrap';
import OrganizationService from '@/services/organizationService';
import useForm from '@/shared/hooks/useForm';
import { Organization } from '@/types/organization';
import AddContactsInfoTable from './AddContactsInfoTable';
import { CreateUpdateContactDTO } from '@/types/contact';
import ContactService from '@/services/contactService';
import AddUpdateAliases from '@/shared/components/AddUpdateAliases';
import Loading from '@/shared/components/Loading';

export interface InfoForOrganization {
  id: number,
  name: string;
  email: string;
  phone: string;
  exten: string;
  [key: string]: string | number| undefined;
}

export interface FormProps{
  first_name: string;
  last_name: string;
  organizations: Organization[];
  infoPerOrganization: InfoForOrganization[];
  aliases: string[];
}

function CreateUpdateContacts() {
  const navigate = useNavigate();
  const { id } = useParams();
  let contactId = id ? parseInt(id, 10) : undefined;
  const isUpdateMode = contactId !== undefined;
  const [isLoading, setIsLoading] = useState(true);

  const [allOrganizations, setAllOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    // Fetch all data needed
    async function fetchRequiredData() {
      try {
        const promises = [
          OrganizationService.getAll(),
        ];

        if (isUpdateMode) {
          promises.push(loadContactData(contactId!));
        }

        const [allOrganizationsResponse] = await Promise.all(promises);

        setAllOrganizations(allOrganizationsResponse);

        setIsLoading(false);
      } catch (ex) {
        toast.error('An unexpected error occurred.');
      }
    }

    fetchRequiredData();
  }, []);

  const loadContactData = async (conId: number) => {
    const contact = await ContactService.getById(conId);

    form.setData({
      first_name: contact.first_name,
      last_name: contact.last_name,
      aliases: contact.aliases.map((alias) => alias.alias),
      organizations: contact.organizations,
      infoPerOrganization: contact.organizationContacts.map((orgCon) => {
        const organization = contact.organizations.find((org) => org.id === orgCon.organizationId);

        return {
          id: orgCon.organizationId,
          name: organization!.name,
          email: orgCon.email,
          phone: orgCon.phone,
          exten: orgCon.exten,
        };
      }),
    });
  };

  const fields: FormProps = {
    first_name: '',
    last_name: '',
    organizations: [],
    infoPerOrganization: [],
    aliases: [],
  };

  const schema = Joi.object({
    first_name: Joi.string().required().label('First Name'),
    last_name: Joi.string().required().label('Last Name'),
    aliases: Joi.array().unique().items(Joi.string().label('Aliases'))
      .messages({
        'array.unique': 'Duplicate alias detected, please remove it.',
      }),
    infoPerOrganization: Joi.array().items(
      Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).allow(null, '').label('Email'),
        phone: Joi.string().replace(/-/g, '').min(10).max(15).pattern(/^[0-9]+$/).allow(null, '').label('Phone Number'),
        exten: Joi.string().replace(/[+*\-#]/g, '').min(0).max(5).pattern(/^[0-9]+$/).allow(null, '').label('Extension'),
      }).options({ allowUnknown: true }).custom((value, helpers) => {
        const emailIsEmpty = value.email === null || value.email === '' || value.email === undefined;
        const phoneIsEmpty = value.phone === null || value.phone === '' || value.phone === undefined;
        if (emailIsEmpty && phoneIsEmpty) {
          return helpers.error('object.missing', { customValue: value });
        }
        if (value.exten && !value.phone) {
          return helpers.error('object.extensionWithoutPhone', { customValue: value });
        }
        return value;
      }).messages({
        'object.missing': 'Each row must contain at least one of Email or Phone Number.',
        'object.extensionWithoutPhone': 'Extensions must have a phone number',
      }).unknown(true),
    ).min(1).label('Organizations'),
  }).options({ allowUnknown: true });

  const doSubmit = async () => {
    const info = form.data.infoPerOrganization.map((infoPerOrg) => {
      const {
        id: orgId, email, phone, exten,
      } = infoPerOrg;

      return {
        id: orgId, email, phone, exten,
      };
    });

    try {
      const ContactDTO: CreateUpdateContactDTO = {
        first_name: form.data.first_name,
        last_name: form.data.last_name,
        aliases: form.data.aliases,
        organizations: info.map((item) => ({
          id: item.id,
          email: item.email,
          phone: item.phone,
          exten: item.exten,
        })),
      };

      if (isUpdateMode) {
        const newContact = await ContactService.update(contactId!, ContactDTO);
        contactId = newContact.id;
      } else {
        await ContactService.create(ContactDTO);
      }

      navigate('/contacts', { replace: true });
    } catch (ex) {
      console.error(ex);
    }
  };

  const form = useForm<FormProps>({ fields, schema, doSubmit });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <h1>
        {isUpdateMode ? 'Update' : 'Create'}
        {' '}
        Contact
      </h1>
      <form className="m-auto w-70p">
        <div className="flex">
          <div className="w-1/2">
            {form.renderInput({ id: 'first_name', label: 'First Name' })}
          </div>
          <div className="w-1/2">
            {form.renderInput({ id: 'last_name', label: 'Last Name' })}
          </div>
        </div>
        <Form.Label>Add Aliases</Form.Label>
        <AddUpdateAliases
          aliases={form.data.aliases}
          handleChange={form.handleDataChange}
          error={form.errors.aliases}
        />
      </form>
      <div className="m-auto w-80p center mt-3">
        <AddContactsInfoTable
          allOrganizations={allOrganizations}
          organizations={form.data.infoPerOrganization}
          handleChange={form.handleDataChange}
          organizationsError={form.errors.organizations}
          lowerOrgsErrors={form.errors.infoPerOrganization}
        />
      </div>
      {form.renderButton(isUpdateMode ? 'Update' : 'Create')}
    </>
  );
}

export default CreateUpdateContacts;

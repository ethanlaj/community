/* eslint-disable newline-per-chained-call */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { toast } from 'react-toastify';
import { Form } from 'react-bootstrap';
import OrganizationService from '@/services/organizationService';
import useForm from '@/shared/hooks/useForm';
import { Organization } from '@/types/organization';
import AddContactsInfoTable from './AddContactsInfoTable';
import { CreateContactDTO } from '@/types/contact';
import ContactService from '@/services/contactService';
import AddUpdateAliases from '@/shared/components/AddUpdateAliases';

export interface InfoForOrganization {
  id: number,
  name: string;
  email: string;
  phone: string;
  exten: string;
  [key: string]: string | number| undefined;
}

export interface FormProps{
  name: string;
  organizations: Organization[];
  infoPerOrganization: InfoForOrganization[];
  aliases: string[];
}

function CreateContacts() {
  const navigate = useNavigate();

  const [allOrganizations, setAllOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    // Fetch all data needed
    async function fetchRequiredData() {
      try {
        const promises = [
          OrganizationService.getAll(),
        ];

        const [allOrganizationsResponse] = await Promise.all(promises);

        setAllOrganizations(allOrganizationsResponse);
      } catch (ex) {
        toast.error('An unexpected error occurred.');
      }
    }

    fetchRequiredData();
  }, []);

  const fields: FormProps = {
    name: '',
    organizations: [],
    infoPerOrganization: [],
    aliases: [],
  };

  const schema = Joi.object({
    name: Joi.string().required().label('Name'),
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
        id, email, phone, exten,
      } = infoPerOrg;
      return {
        id, email, phone, exten,
      };
    });

    try {
      const ContactDTO: CreateContactDTO = {
        name: form.data.name,
        aliases: form.data.aliases,
        organizations: info.map((item) => ({
          id: item.id,
          email: item.email,
          phone: item.phone,
          exten: item.exten,
        })),
      };

      console.log('Submit to api', ContactDTO);

      // Pass CreateContactDTO with the expected structure
      await ContactService.create(ContactDTO);

      navigate('/contacts', { replace: true });
    } catch (ex) {
      console.error(ex);
    }
  };

  const form = useForm<FormProps>({ fields, schema, doSubmit });

  return (
    <>
      <h1>Create Contact</h1>
      <form className="m-auto w-70p">
        {form.renderInput({ id: 'name', label: 'Name' })}

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
      {form.renderButton('Create')}
    </>
  );
}

export default CreateContacts;

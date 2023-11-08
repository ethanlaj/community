/* eslint-disable newline-per-chained-call */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { toast } from 'react-toastify';
import OrganizationService from '@/services/organizationService';
import useForm from '@/shared/hooks/useForm';
import { Organization } from '@/types/organization';
import AddContactsInfoTable from './AddContactsInfoTable';
import { CreateContactDTO } from '@/types/contact';
import ContactService from '@/services/contactService';

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

  };

  const schema = Joi.object({
    name: Joi.string().required().label('Name'),
    infoPerOrganization: Joi.array().items(
      Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).allow(null, '').label('Email'),
        phone: Joi.string().replace(/-/g, '').replace(/^\+/, '').pattern(/^[0-9+]+$/)
          .min(10).max(15).allow(null, '').label('Phone Number'),
        exten: Joi.string().allow(null, '').pattern(/^[0-9+#*]+$/).label('Phone Extension'),
      }).when(Joi.object({ exten: Joi.exist() }), {
        then: Joi.object({ phone: Joi.string().required().label('Phone Number') }),
        otherwise: Joi.object({ phone: Joi.string().label('Phone Number') }),
      }).or('email', 'phone').options({ allowUnknown: true }).custom((value, helpers) => {
        if ((value.email === null || value.email === '') && (value.phone === null || value.phone === '')) {
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
    ).min(1).label('Organizations').messages({ 'array.min': 'Must have at least one organization.' }),
  });

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
      </form>
      <div className="m-auto w-80p center">
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

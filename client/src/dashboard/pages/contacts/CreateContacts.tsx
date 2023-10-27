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
  phone: string
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
    infoPerOrganization: Joi.array().items({
      id: Joi.number().allow(null, ''),
      name: Joi.string().required(),
      email: Joi.string().email({ tlds: { allow: false } }).allow(null, '').label('Email'),
      phone: Joi.string().replace(/-/g, '').length(10).pattern(/^[0-9]+$/).allow(null, '').label('Phone Number'),
      createdAt: Joi.any().allow(null),
      updatedAt: Joi.any().allow(null),
      contacts: Joi.any().allow(null),
      organizationLocations: Joi.any().allow(null),
      communications: Joi.any().allow(null),
    }).min(1).label('Organizations'),
  }).options({ allowUnknown: true });

  const doSubmit = async () => {
    const info = form.data.infoPerOrganization.map((infoPerOrg) => {
      const { id, email, phone } = infoPerOrg;
      return { id, email, phone };
    });

    try {
      const ContactDTO: CreateContactDTO = {
        name: form.data.name,
        organizations: info.map((item) => ({
          id: item.id,
          email: item.email,
          phone: item.phone,
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

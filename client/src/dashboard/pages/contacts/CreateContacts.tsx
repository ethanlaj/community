/* eslint-disable newline-per-chained-call */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Joi from 'joi';
import { toast } from 'react-toastify';
import OrganizationService from '@/services/organizationService';
import useForm from '@/shared/hooks/useForm';
import { Organization } from '@/types/organization';
import AddContactsInfoTable from './AddContactsInfoTable';

export interface InfoForOrganization {
  id: number,
  name: string;
  email: string | undefined;
  phone: string | undefined;
  [key: string]: string | number| undefined;
}
interface CreateContactDTO {
  name: string,
  organizations:{
    id: number,
    name: string;
    email: string | undefined;
    phone: string | undefined;
  }[];
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
    InfoPerOrganization: Joi.array().items({
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
    try {
      const ContactDTO: CreateContactDTO = {
        name: form.data.name,
        organizations: { ...form.data.infoPerOrganization },

      };

      console.log('Submit to api', ContactDTO);

      // Pass CreateContactDTO with the expected structure
      // await ContactService.create();

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
          form={form}
          handleChange={form.handleDataChange}
          organizationsError={form.errors.organizations}
          lowerOrgsErrors={form.errors.infoPerOrganization}
        />
      </div>
      <Button onClick={() => doSubmit()} className="hover:bg-yellow-600">Create</Button>
    </>
  );
}

export default CreateContacts;

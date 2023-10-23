/* eslint-disable newline-per-chained-call */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { toast } from 'react-toastify';
import OrganizationService from '@/services/organizationService';
import useForm from '@/shared/hooks/useForm';
import { Organization } from '@/types/organization';
import AddContactsInfoTable from './AddContactsInfoTable';

export interface InfoForOrganization {
  id: number,
  name: string;
  email: string,
  phone: string,
}
interface CreateContactDTO {
  name: string,
  email: string,
  phone: string,
  exten: string;
  locationIds: number[];
}

interface FormProps{
    organizations: Organization[];
    InfoForOrganization: InfoForOrganization[];
  name: string;
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

  const fields = {
    organizations: [],
    InfoForOrganization: [],
    name: '',

  };

  const schema = Joi.object({
    name: Joi.string().required().label('Name'),
    InfoPerOrganization: Joi.array().items({
      emails: Joi.string().email({ tlds: { allow: false } }).label('Email'),
      phones: Joi.string().replace(/-/g, '').length(10).pattern(/^[0-9]+$/).label('Phone'),
    }).min(1),
  });

  const doSubmit = async () => {
    try {
      console.log('Submit to api');
      console.log('ORG PASS DEFINATION');

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
          organizations={form.data.InfoForOrganization}
          form={form}
          handleChange={form.handleDataChange}
          organizationsError={form.errors.organizations}
        />
      </div>
    </>
  );
}

export default CreateContacts;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import useForm from '@/shared/hooks/useForm';
import styles from './CreateOrganization.module.css';
import CreateLocation from '@/dashboard/pages/organizations/CreateLocation';
import AddContacts from '@/dashboard/pages/contacts/AddContacts';
import organizationService from '@/services/organizationService';

function CreateOrganization() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    locations: [
      {
        name: '',
        address: '',
      },
    ],
    contacts: [],
  });
  const [errors, setErrors] = useState({});

  const schema = {
    name: Joi.string().required().label('Organization Name'),
    locations: Joi.array().items({
      name: Joi.string().required().label('Location Name'),
      address: Joi.string().required().label('Location Address'),
    }),
    contacts: Joi.array().items(Joi.object().label('Contact')).label('Organization').required(),
  };

  const doSubmit = async () => {
    try {
      console.log('Submit to api', { ...data });

      await organizationService.create({ ...data });

      navigate('/', { replace: true });
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        const errorMsg = 'Incorrect email or password.';

        const errorsClone = { ...errors };
        errorsClone.email = errorMsg;

        setErrors(errorsClone);
      }
    }
  };

  const form = useForm(data, setData, errors, setErrors, schema, doSubmit);

  return (
    <div>
      <h1>Create Organization</h1>
      <form className={`${styles.formContainer}`}>
        {form.renderInput('name', 'Name')}
        <h3>Add Locations</h3>
        {form.renderChildForm(form, 'locations', CreateLocation, data.locations)}
        <h3>Add Contacts</h3>
        {form.renderChildForm(form, 'contacts', AddContacts, data.contacts)}
        {form.renderButton('Create')}
      </form>
    </div>
  );
}

export default CreateOrganization;

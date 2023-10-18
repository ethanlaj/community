/* eslint-disable linebreak-style */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import AddContacts from './AddContacts';
import AddLocation from '@/dashboard/pages/organizations/AddLocation';
import useForm from '@/shared/hooks/useForm';
import AddOrganization from '@/dashboard/pages/organizations/AddOrganization';
import styles from './Contacts.module.css';

function CreateContacts() {
  const navigate = useNavigate();
  const now = new Date();
  const timeZoneOffset = now.getTimezoneOffset();
  const nowLocal = new Date(now.getTime() - timeZoneOffset * 60 * 1000);

  const [data, setData] = useState({
    date: nowLocal.toISOString().substr(0, 10),
    name: '',
    email: '',
    phoneNumber: '',
    location: null,
    organization: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setData({
      ...data, location: null, contacts: [], users: [],
    });
  }, [data.organization]);

  const schema = {
    name: Joi.string().required().label('Name'),
    date: Joi.date().required().label('Date'),
    location: Joi.object().allow(null).label('Location'),
    organization: Joi.object().allow(null).label('Organization'),
    email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
    phoneNumber: Joi.string().replace(/-/g, '').length(10).pattern(/^[0-9]+$/)
      // eslint-disable-next-line newline-per-chained-call
      .required().label('Phone'),
  };

  const doSubmit = async () => {
    try {
      console.log('Submit to api', { ...data, locationId: data.location?.id });

      await AddContacts.create({ ...data, locationId: data.location?.id });
      navigate('/contacts', { replace: true });
    } catch (ex) {
      console.error(ex);
    }
  };
  console.log(schema)
  const form = useForm(data, setData, errors, setErrors, schema, doSubmit);

  return (
    <div>
      <h1>Create Contacts</h1>
      <form className={`${styles.formContainer}`}>
        {form.renderInput('Name', 'Name', null, 'text')}
        {form.renderInput('Email', 'Email', null, 'text')}
        {form.renderInput('Phone', 'Phone Number', null, 'PhoneNumber')}

        <h3>Organization</h3>
        {form.renderChildForm(form, 'organization', AddOrganization, data.organization, { organizationId: data.organization })}

        {data.organization && (
          <div>
            <h3>Location</h3>
            {form.renderChildForm(form, 'location', AddLocation, data.location, {
              organizationId: data.organization.id,
            })}
          </div>
        )}

        {form.renderButton('Create')}
      </form>
    </div>
  );
}

export default CreateContacts;

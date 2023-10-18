import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import useForm from '@/shared/hooks/useForm';
import styles from './CreateCommunication.module.css';
import AddContacts from '@/dashboard/pages/contacts/AddContacts';
import AddUsers from '@/dashboard/pages/users/AddUsers';
import AddLocation from '@/dashboard/pages/organizations/AddLocation';
import AddOrganization from '@/dashboard/pages/organizations/AddOrganization';
import communicationService from '@/services/communicationService';

function CreateCommunication() {
  const navigate = useNavigate();
  const now = new Date();
  const timeZoneOffset = now.getTimezoneOffset();
  const nowLocal = new Date(now.getTime() - timeZoneOffset * 60 * 1000);

  const [data, setData] = useState({
    date: nowLocal.toISOString().substr(0, 10),
    contacts: [],
    users: [],
    note: '',
    location: null,
    organization: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setData({
      ...data, location: null, contacts: [], users: [],
    });
  }, [data.organization]);

  const schema = Joi.object({
    date: Joi.date().required().label('Date'),
    contacts: Joi.array().items(Joi.object().label('Contact')).required(),
    users: Joi.array().items(Joi.object().label('User')).required(),
    note: Joi.string().allow('').label('Note'),
    location: Joi.object().allow(null).label('Location'),
    organization: Joi.object().required(),
  });

  const doSubmit = async () => {
    try {
      console.log('Submit to api', { ...data, locationId: data.location?.id });

      await communicationService.create({ ...data, locationId: data.location?.id });
      navigate('/communications', { replace: true });
    } catch (ex) {
      console.error(ex);
    }
  };

  const form = useForm({ data, setData, errors, setErrors, schema, doSubmit });
  
  return (
    <div>
      <h1>Create Communication</h1>
      <form className={`${styles.formContainer}`}>
        {form.renderInput({ id: 'date', label: 'Date', type: 'date' })}
        {form.renderInput({ id: 'note', label: 'Note', type: 'textarea' })}

        <h3>Organization</h3>
        {form.renderChildForm(
          form,
          'organization',
          AddOrganization,
          data.organization,
          { organizationId: data.organization },
        )}

        {data.organization && (
          <div>
            <h3>Location</h3>
            {form.renderChildForm(form, 'location', AddLocation, data.location, {
              organizationId: data.organization.id,
            })}

            <h3>Add Contacts</h3>
            <p>Which organization members were a part of this communication?</p>
            {form.renderChildForm(form, 'contacts', AddContacts, data.contacts, {
              organizationId: data.organization.id,
            })}

            <h3>Add Users</h3>
            <p>
              Which Elizabethtown College staff were a part of this communication?
            </p>
            {form.renderChildForm(form, 'users', AddUsers, data.users)}
          </div>
        )}

        {form.renderButton('Create')}
      </form>
    </div>
  );
}

export default CreateCommunication;

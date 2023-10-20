import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import useForm from '@/shared/hooks/useForm';
import styles from './CreateOrganization.module.css';
import CreateLocation from '@/dashboard/pages/organizations/CreateLocation';
import AddContacts from '@/dashboard/pages/contacts/AddContacts';
import organizationService from '@/services/organizationService';

interface FormProps {
  name: string;
  locations: {
    name: string;
    address: string;
  }[];
  contacts: {
    name: string;
    email: string;
    phone: string;
  }[];
}

function CreateOrganization() {
  const navigate = useNavigate();

  const fields: FormProps = {
    name: '',
    locations: [
      {
        name: '',
        address: '',
      },
    ],
    contacts: [],
  };

  const schema = Joi.object({
    name: Joi.string().required().label('Organization Name'),
    locations: Joi.array().items({
      name: Joi.string().required().label('Location Name'),
      address: Joi.string().required().label('Location Address'),
    }),
    contacts: Joi.array().items(Joi.object().label('Contact')).label('Organization').required(),
  });

  const doSubmit = async () => {
    try {
      console.log('Submit to api', { ...form.data });

      await organizationService.create({ ...form.data });

      navigate('/', { replace: true });
    } catch (ex: any) {
      console.log(ex); // TODO: Toast
    }
  };

  const form = useForm<FormProps>({ fields, schema, doSubmit });

  return (
    <div>
      <h1>Create Organization</h1>
      <form className={styles.formContainer}>
        {form.renderInput({ id: 'name', label: 'Name' })}
        <h3>Add Locations</h3>
        {form.renderChildForm(form, 'locations', CreateLocation, form.data.locations)}
        <h3>Add Contacts</h3>
        {form.renderChildForm(form, 'contacts', AddContacts, form.data.contacts)}
        {form.renderButton('Create')}
      </form>
    </div>
  );
}

export default CreateOrganization;

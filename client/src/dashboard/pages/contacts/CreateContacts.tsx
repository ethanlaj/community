import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import ContactService from '@/services/contactService'
import AddLocation from '@/dashboard/pages/organizations/AddLocation';
import useForm from '@/shared/hooks/useForm';
import AddOrganization from '@/dashboard/pages/organizations/AddOrganization';
import styles from './Contacts.module.css';

interface CreateContactDTO {
  name: string,
  email: string,
  phone: string,
  exten: string;
  locationIds: number[];
}

interface FormProps {
 
  organizations: {
    id: number;
    orgName: string;
    locations: {
      id: number;
      locName: string;
      address: string;
    }[] | null;

  }[] | null;
  name: string;
  email: string;
  phone: string;
  exten: string;
}

function CreateContacts() {
  const navigate = useNavigate();

  const fields: FormProps = {
      name: '',
      email: '',
      phone: '',
      exten: '',
      organizations: [],
};

  const schema = Joi.object({
    name: Joi.string().label('Name').required(),
    date: Joi.date().label('Date').required(),
    locations: Joi.array().items(Joi.object().label('Location')).required(),
    organizations: Joi.array().items(Joi.object().label('Organization')).required(),
    email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
    phone: Joi.string().replace(/-/g, '').length(10).pattern(/^[0-9]+$/)
      .required().label('Phone'),
      //exten: Joi.string().length(5).pattern(/^[0-9*#]+$/).label('Extension'),
  });

  const doSubmit = async () => {
    try {
      const locationIds = form.data.organizations ? form.data.organizations.map(location => location.id) : [];
  
      const CreateContactDTO: CreateContactDTO = {
        name: form.data.name,
        email: form.data.email,
        phone: form.data.phone,
        exten: form.data.exten,
        locationIds,
      }
  
      console.log('Submit to api', { CreateContactDTO });
      console.log('ORG PASS DEFINATION');
      console.log(fields.organizations);
  
      // Pass CreateContactDTO with the expected structure
      await ContactService.create(CreateContactDTO);
      navigate('/contacts', { replace: true });
    } catch (ex) {
      console.error(ex);
    }
  };
  

  const form = useForm<FormProps>({ fields, schema, doSubmit });

  return (
    <div>
      <h1>Create Contacts</h1>
      <form className={`${styles.formContainer}`}>
        {form.renderInput({id: 'name', label: 'name'})}
        {form.renderInput({id: 'email', label: 'name'})}
        {form.renderInput({id: 'phone', label: 'phone'})}

        <h3>Organization</h3>
        {form.renderChildForm(form, 'organizations', AddOrganization, form.data.organizations, { organizationId: form.data.organizations })}

        {form.data.organizations && (
          <div>
            <h3>Location</h3>
            {form.renderChildForm(form, 'locations', AddLocation, form.data.organizations
  ?.flatMap(organization => organization.locations?.map(location => location?.locName))
  ?.filter(name => name !== null) || [], {
              organizationId: form.data.organizations.map(id=>id),
            })}
          </div>
        )}

        {form.renderButton('Create')}
      </form>
    </div>
  );
}

export default CreateContacts;

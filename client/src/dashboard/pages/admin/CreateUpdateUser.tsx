import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Joi from 'joi';
import useForm from '@/shared/hooks/useForm';
import styles from './CreateUpdateUser.module.css';
import userService from '@/services/userService';
import officeService from '@/services/officeService';
import { UserDTO } from '@/types/user';
import { EtownOffice } from '@/types/office';
import Loading from '@/shared/components/Loading';
import ReactiveSearch from '@/shared/components/ReactiveSearch';

interface FormProps {
  office: EtownOffice | null;
  permissionLevel: string;
  email: string;
  name: string;
}

function CreateUpdateUser() {
  const navigate = useNavigate();
  const [allOffices, setAllOffices] = useState<EtownOffice[]>([]);
  const { id } = useParams();
  const userId = id ? parseInt(id, 10) : undefined;
  const isUpdateMode = userId !== undefined;
  const [isLoading, setIsLoading] = useState(isUpdateMode);

  useEffect(() => {
    // Fetch all data needed
    async function fetchRequiredData() {
      try {
        setAllOffices(await officeService.getAll());
      } catch (ex) {
        toast.error('An unexpected error occurred.');
      }
    }
    fetchRequiredData();
  }, []);

  const fields: FormProps = {
    office: null,
    permissionLevel: '',
    email: '',
    name: '',
  };

  const domainRegex = /^[a-zA-Z0-9._%+-]+@etown\.edu$/;

  const schema = Joi.object({
    office: Joi.object().required().label('Office'),
    // eslint-disable-next-line newline-per-chained-call
    permissionLevel: Joi.number().required().min(1).max(4).label('User Permission Level'),
    email: Joi.string().email({ tlds: { allow: false } }).regex(domainRegex).label('Email')
      .messages({
        'string.email': 'Invalid email format',
        'string.pattern.base': 'Invalid email. Only etown.edu email addresses are allowed.',
      }),
    name: Joi.string().required().label('Name'),
  });

  const doSubmit = async () => {
    try {
      const newUser: UserDTO = {
        officeId: form.data.office?.id || 0,
        permissionLevel: form.data.permissionLevel,
        email: form.data.email,
        name: form.data.name,
      };

      console.log('Submit to api', newUser);

      if (isUpdateMode) {
        await userService.update(userId!, newUser);
      } else {
        await userService.create(newUser);
      }
      navigate('/admin', { replace: true });
    } catch (ex) {
      console.error(ex);
    }
  };

  const form = useForm<FormProps>({ fields, schema, doSubmit });

  useEffect(() => {
    if (isUpdateMode) {
      loadUserData(userId!)
        .then(() => setIsLoading(false));
    }
  }, [userId]);

  const loadUserData = async (UserId: number) => {
    const user = await userService.getById(UserId);
    form.setData({
      office: user.office,
      permissionLevel: user.permissionLevel,
      email: user.email,
      name: user.name,
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1>
        {isUpdateMode ? 'Update' : 'Create'}
        {' '}
        User
      </h1>
      <form className={styles.formContainer}>
        {form.renderInput({ id: 'name', label: 'Name', type: 'string' })}
        {form.renderInput({ id: 'email', label: 'Email', type: 'string' })}
        <ReactiveSearch
          id="office"
          items={allOffices}
          headerLabel="Office"
          resetOnSelect={false}
          selectionLabel="Select Office"
          idPath="id"
          valuePath="name"
          value={form.data.office}
          error={undefined}
          onRefresh={undefined}
          onChange={(newOffice:EtownOffice) => { form.handleDataChange('office', newOffice); }}
        />
        {form.renderInput({
          id: 'permissionLevel',
          label: 'Permission Level',
          type: 'number',
          placeholder: 'Permission Level 1-4',
        })}
        {form.renderButton(isUpdateMode ? 'Update' : 'Create')}
      </form>
    </div>
  );
}

export default CreateUpdateUser;

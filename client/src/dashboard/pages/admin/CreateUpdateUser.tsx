import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Joi from 'joi';
import { Alert, Form } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
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

  const schema = Joi.object({
    office: Joi.object().required().label('Office'),
    // eslint-disable-next-line newline-per-chained-call
    permissionLevel: Joi.number().required().min(1).max(4).label('User Permission Level'),
    email: Joi.string()
      .pattern(/^[^@.]*$/)
      .label('Email')
      .messages({
        'string.pattern.base': 'The email domain is already provided for you',
      }),

    name: Joi.string().required().label('Name'),
  });

  const doSubmit = async () => {
    try {
      const newUser: UserDTO = {
        officeId: form.data.office?.id || 0,
        permissionLevel: form.data.permissionLevel,
        email: `${form.data.email}@etown.edu`,
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
      email: user.email.split('@')[0],
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
        <Form.Label>Email</Form.Label>
        <InputGroup className="mb-3">

          <Form.Control
            placeholder="Recipient's username"
            aria-describedby="basic-addon2"
            value={form.data.email}
            onChange={(e) => form.handleDataChange('email', e.target.value)}
          />
          <InputGroup.Text id="basic-addon2">@etown.edu</InputGroup.Text>
        </InputGroup>
        {form.errors.email && <Alert variant="danger">{form.errors.email}</Alert>}
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
          onChange={(newOffice: EtownOffice) => { form.handleDataChange('office', newOffice); }}
        />
        {form.renderSelect('permissionLevel', 'Permission Level', [
          {
            name: '1 - Read Only',
            value: 1,
          },
          {
            name: '2 - Create & Update',
            value: 2,
          },
          {
            name: '3 - Delete',
            value: 3,
          },
          {
            name: '4 - Admin',
            value: 4,
          },
        ], false)}
        {form.renderButton(isUpdateMode ? 'Update' : 'Create')}
      </form>
    </div>
  );
}

export default CreateUpdateUser;

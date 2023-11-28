import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Joi from 'joi';
import useForm from '@/shared/hooks/useForm';
import styles from './CreateUsers.module.css';
import userService from '@/services/userService';
import officeService from '@/services/officeService';
import { UserDTO } from '@/types/user';
import { EtownOffice } from '@/types/office';

interface FormProps {
  id: number | undefined;
  office: EtownOffice | null;
  permissionLevel: string;
  email: string;
  name: string;
}

function UpdateUser() {
  const navigate = useNavigate();
  const [allOffices, setAllOffices] = useState<EtownOffice[]>([]);
  const { id } = useParams();
  const userId = id ? parseInt(id, 10) : undefined;

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
    id: userId,
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
        id: form.data.id,
        officeId: form.data.office?.id || 0,
        permissionLevel: form.data.permissionLevel,
        email: form.data.email,
        name: form.data.name,
      };

      console.log('Submit to api', newUser);

      await userService.update(userId!, { ...form.data });

      navigate('/admin', { replace: true });
    } catch (ex) {
      console.error(ex);
    }
  };

  const form = useForm<FormProps>({ fields, schema, doSubmit });

  useEffect(() => { loadUserData(userId!); }, []);

  const loadUserData = async (UserId: number) => {
    const user = await userService.getById(UserId);
    form.setData({
      id: user.id,
      office: user.office,
      permissionLevel: user.permissionLevel,
      email: user.email,
      name: user.name,
    });
  };

  return (
    <div>
      <h1>Update User</h1>
      <form className={styles.formContainer}>
        {form.renderInput({ id: 'name', label: 'Name', type: 'string' })}
        {form.renderInput({ id: 'email', label: 'Email', type: 'string' })}
        {form.renderSearch({
          id: 'office',
          items: allOffices,
          headerLabel: 'Office',
          selectionLabel: 'Select Office',
          keyPath: 'id',
          valuePath: 'name',
        })}
        {form.renderInput({
          id: 'permissionLevel',
          label: 'Permission Level',
          type: 'number',
          placeholder: 'Permission Level 1-4',
        })}
        {form.renderButton('Update')}
      </form>
    </div>
  );
}

export default UpdateUser;

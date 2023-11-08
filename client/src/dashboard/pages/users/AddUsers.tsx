import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
import useForm from '@/shared/hooks/useForm';
import styles from './AddUsers.module.css';
import userService from '@/services/userService';
import officeService from '@/services/officeService';
import { User } from '@/types/user';
import { EtownOffice } from '@/types/office';

function AddUsers() {
  const navigate = useNavigate();
  const [allOffices, setAllOffices] = useState<EtownOffice[]>([]);

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

  const fields: User = {
    office: null,
    permissionLevel: '',
    email: '',
    name: '',
  };

  const schema = Joi.object({
    office: Joi.object().required().label('Office'),
    // eslint-disable-next-line newline-per-chained-call
    permissionLevel: Joi.number().required().min(1).max(4).label('User Permission Level'),
    email: Joi.string().email({ tlds: { allow: false } }).label('Email'),
    name: Joi.string().required().label('Name'),
  });

  const doSubmit = async () => {
    console.log(form.data);
    try {
      const newUser:User = {
        office: form.data.office,
        permissionLevel: form.data.permissionLevel,
        email: form.data.email,
        name: form.data.name,
      };

      console.log('Submit to api', newUser);

      await userService.create(newUser);

      navigate('/admin', { replace: true });
    } catch (ex) {
      console.error(ex);
    }
  };

  const form = useForm<User>({ fields, schema, doSubmit });

  return (
    <div>
      <h1>Add New User</h1>
      <form className={styles.formContainer}>
        {form.renderInput({ id: 'name', label: 'Name', type: 'string' })}
        {form.renderInput({ id: 'email', label: 'Email', type: 'string' })}
        {form.renderSearch({
          id: 'office',
          items: allOffices,
          keyPath: 'id',
          valuePath: 'name',
        })}
        {form.renderInput({ id: 'permissionLevel', label: 'Permission Level', type: 'number' })}
        {form.renderButton('Add')}
      </form>
    </div>
  );
}

export default AddUsers;

import { useParams, useNavigate } from 'react-router-dom';
import Joi from 'joi';
import { useEffect, useState } from 'react';
import useForm from '@/shared/hooks/useForm';
import CreateLocation from '@/dashboard/pages/organizations/CreateLocation';
import organizationService from '@/services/organizationService';
import AddUpdateAliases from '@/shared/components/AddUpdateAliases';
import Loading from '@/shared/components/Loading';

interface FormProps {
  name: string;
  organizationLocations: {
    id?: number;
    name: string;
    address: string;
  }[];
  aliases: string[];
}

function CreateUpdateOrganization() {
  const navigate = useNavigate();
  const { id } = useParams();
  let organizationId = id ? parseInt(id, 10) : undefined;
  const isUpdateMode = organizationId !== undefined;
  const [isLoading, setIsLoading] = useState(isUpdateMode);

  const fields: FormProps = {
    name: '',
    organizationLocations: [
      {
        name: '',
        address: '',
      },
    ],
    aliases: [],
  };

  const schema = Joi.object({
    name: Joi.string().required().label('Organization Name'),
    organizationLocations: Joi.array().items({
      id: Joi.number().optional().label('Location ID'),
      name: Joi.string().required().label('Location Name'),
      address: Joi.string().required().label('Location Address'),
    }).label('Locations'),
    aliases: Joi.array().unique().items(Joi.string().label('Alias')).label('Aliases')
      .messages({
        'array.unique': 'Duplicate alias detected, please remove it.',
      }),
  });

  const doSubmit = async () => {
    try {
      const existingOrg = await organizationService.getbyName(form.data.name);
      if (existingOrg && existingOrg.id !== organizationId) {
        form.setErrors({ name: 'Organization already exists with this name' });
        return;
      }

      if (isUpdateMode) {
        await organizationService.update(organizationId!, { ...form.data });
      } else {
        const newOrg = await organizationService.create({ ...form.data });
        organizationId = newOrg.id;
      }

      navigate(`/organization/${organizationId}`, { replace: true });
    } catch (ex: any) {
      console.log(ex); // TODO: Toast
    }
  };

  const form = useForm<FormProps>({ fields, schema, doSubmit });

  useEffect(() => {
    if (isUpdateMode) {
      loadOrganizationData(organizationId!)
        .then(() => setIsLoading(false));
    }
  }, [organizationId]);

  const loadOrganizationData = async (orgId: number) => {
    const org = await organizationService.getById(orgId);
    form.setData({
      name: org.name,
      organizationLocations: org.organizationLocations.map((location) => ({
        id: location.id,
        name: location.name,
        address: location.address,
      })),
      aliases: org.aliases?.map((alias) => alias.alias) || [],
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
        Organization
      </h1>
      <form className="m-auto w-70p">
        {form.renderInput({ id: 'name', label: 'Name' })}

        <h3>Locations</h3>
        {form.renderChildForm(form, 'organizationLocations', CreateLocation, form.data.organizationLocations)}

        <h3>Aliases</h3>
        <AddUpdateAliases
          aliases={form.data.aliases}
          handleChange={form.handleDataChange}
          error={form.errors.aliases}
        />

        {form.renderButton(isUpdateMode ? 'Update' : 'Create')}

      </form>
    </div>
  );
}

export default CreateUpdateOrganization;

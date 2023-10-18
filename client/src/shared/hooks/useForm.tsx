/* eslint-disable no-shadow */
/* eslint-disable default-param-last */
import Joi from 'joi';
import { ChangeEvent, useState } from 'react';
import Input from '../components/Input';
import ReactiveSearch from '../components/ReactiveSearch';
import EditableTable from '../components/EditableTable';
import Select from '../components/Select';
import {
  UseFormProps,
  UseFormReturn,
  Errors,
  ValidatePropertyProps,
  EditableTableProps,
  RenderSelectOption,
  RenderInputProps,
  RenderSearchProps,
} from '@/types/inputTypes';

function useForm<T extends object>({
  fields,
  schema,
  doSubmit,
}: UseFormProps<T>): UseFormReturn<T> {
  const [data, setData] = useState<T>(fields);

  const [errors, setErrors] = useState<Errors<T>>({});

  const validate = (): Errors<T> => {
    const options = { abortEarly: false };
    const { error } = schema.validate(data, options);
    if (!error) return {};

    const currentErrors: Errors<T> = {};

    for (const item of error.details as Joi.ValidationErrorItem[]) {
      const propertyName = item.path[0] as keyof T;

      if (propertyName in data) {
        currentErrors[propertyName] = item.message;
      }
    }

    return currentErrors;
  };

  const validateProperty = ({ id, value }: ValidatePropertyProps) => {
    const fieldSchema = schema.extract(id);

    const { error } = fieldSchema.validate(value);

    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    doSubmit();
  };

  const handleChange = ({ currentTarget: input }: ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => {
      const newData = { ...prevData };

      const id = input.id as keyof T;
      if (id in newData) {
        newData[id] = input.value as unknown as T[keyof T];
      }

      return newData;
    });

    setErrors((prevErrors) => {
      const currentErrors = { ...prevErrors };

      const errorMessage = validateProperty({ id: input.id, value: input.value });

      const id = input.id as keyof T;

      if (errorMessage) currentErrors[id] = errorMessage;
      else delete currentErrors[id];

      return currentErrors;
    });
  };

  const handleDataChange = (id: string, value: string) => {
    const fakeChangeEvent = { currentTarget: { id, value } } as ChangeEvent<HTMLInputElement>;
    handleChange(fakeChangeEvent);
  };

  const renderChildForm = (
    form: UseFormReturn<T>,
    id: string,
    ChildFormComponent: React.ComponentType<any>,
    childData: any,
    props?: any,
  ) => (
    <ChildFormComponent
      form={form}
      data={childData}
      errors={errors}
      {...props}
      onChange={(value: string) => handleDataChange(id, value)}
    />
  );

  function renderEditableTable({
    columns,
    tableData,
    tableError,
    onUpdate,
    onAdd,
  }: EditableTableProps<T>) {
    return (
      <EditableTable
        columns={columns}
        data={tableData}
        error={tableError}
        onUpdate={onUpdate}
        onAdd={onAdd}
      />
    );
  }

  const renderButton = (label: string) => {
    const isDisabled = Object.keys(validate()).length > 0;

    return (
      <button
        disabled={isDisabled}
        type="button"
        onClick={(e) => handleSubmit(e as any)}
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  };

  const renderSearch = ({
    id,
    items,
    keyPath,
    valuePath,
    headerLabel,
    handleChange,
    resetOnSelect = false,
    selectionLabel = 'Select item',
    onRefresh,
  }: RenderSearchProps) => (
    <ReactiveSearch
      id={id}
      items={items}
      headerLabel={headerLabel}
      resetOnSelect={resetOnSelect}
      selectionLabel={selectionLabel}
      idPath={keyPath}
      valuePath={valuePath}
      error={errors[id as keyof T]}
      onChange={(value: string) => (handleChange ? handleChange(id, value) : handleDataChange(id, value))}
      onRefresh={onRefresh}
    />
  );

  const renderSelect = (id: keyof T, label: string, options: RenderSelectOption[]) => (
    <Select
      id={id}
      label={label}
      options={options}
      value={data[id]}
      error={errors[id]}
      onChange={handleChange}
    />
  );

  const renderInput = ({
    id, label, placeholder = '', type = 'text',
  }: RenderInputProps<T>) => (
    <Input
      name={id}
      label={label}
      type={type}
      placeholder={placeholder}
      value={data[id]}
      error={errors[id]}
      onChange={handleChange}
    />
  );

  return {
    data,
    setData,
    handleSubmit,
    handleChange,
    renderChildForm,
    renderEditableTable,
    renderButton,
    renderSearch,
    renderSelect,
    renderInput,
  };
}

export default useForm;

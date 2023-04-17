import React from "react";
import Input from "../components/Input";
import ReactiveSearch from "../components/ReactiveSearch";
import EditableTable from "../components/EditableTable";
import Joi from "joi";
import Select from "../components/Select";

const useForm = (data, setData, errors, setErrors, schema, doSubmit) => {
	const schemaClass = Joi.object(schema);

	const validate = () => {
		const options = { abortEarly: false };
		const { error } = schemaClass.validate(data, options);
		if (!error) return null;

		const currentErrors = {};
		for (let item of error.details) currentErrors[item.path[0]] = item.message;

		return currentErrors;
	};

	const validateProperty = ({ id, value }) => {
		const obj = { [id]: value };
		const fieldSchema = Joi.object({ [id]: schema[id] });
		const { error } = fieldSchema.validate(obj);
		return error ? error.details[0].message : null;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const errors = validate();
		setErrors(errors || {});
		if (errors) return;

		doSubmit();
	};

	const handleChange = ({ currentTarget: input }) => {
		const currentErrors = { ...errors };
		const errorMessage = validateProperty(input);

		if (errorMessage) currentErrors[input.id] = errorMessage;
		else delete currentErrors[input.id];

		const newData = { ...data };
		newData[input.id] = input.value;

		setData(newData);
		setErrors(currentErrors);
	};

	const handleDataChange = (id, value) => {
		handleChange({ currentTarget: { id, value } });
	};

	const renderChildForm = (form, id, ChildFormComponent, childData, props) => (
		<ChildFormComponent
			form={form}
			data={childData}
			errors={errors}
			{...props}
			onChange={(value) => handleDataChange(id, value)}
		/>
	);

	const renderEditableTable = (columns, tableData, tableError, onUpdate, onAdd) => (
		<EditableTable
			columns={columns}
			data={tableData}
			error={tableError}
			onUpdate={onUpdate}
			onAdd={onAdd}
		/>
	);

	const renderButton = (label) => (
		<button
			disabled={validate()}
			type="button"
			onClick={handleSubmit}
			className="btn btn-primary"
		>
			{label}
		</button>
	);

	const renderSearch = (
		id,
		items,
		keyPath,
		valuePath,
		headerLabel,
		handleChange,
		resetOnSelect = false,
		selectionLabel = "Select item"
	) => (
		<ReactiveSearch
			items={items}
			headerLabel={headerLabel}
			resetOnSelect={resetOnSelect}
			selectionLabel={selectionLabel}
			idPath={keyPath}
			valuePath={valuePath}
			value={data[id]}
			error={errors[id]}
			onChange={(value) =>
				handleChange ? handleChange(id, value) : handleDataChange(id, value)
			}
		/>
	);

	const renderSelect = (id, label, options) => (
		<Select
			id={id}
			label={label}
			options={options}
			value={data[id]}
			error={errors[id]}
			onChange={handleChange}
		/>
	);

	const renderInput = (id, label, placeholder = "", type = "text") => (
		<Input
			id={id}
			label={label}
			type={type}
			placeholder={placeholder}
			value={data[id]}
			error={errors[id]}
			onChange={handleChange}
		/>
	);

	return {
		handleSubmit,
		handleChange,
		renderChildForm,
		renderEditableTable,
		renderButton,
		renderSearch,
		renderSelect,
		renderInput,
	};
};

export default useForm;

import React from "react";
import Input from "./Input";
import ReactiveSearch from "../../shared/components/ReactiveSearch";
import Joi from "joi";
import Select from "./Select";

const useForm = (data, setData, errors, setErrors, schema, doSubmit) => {
	const schemaClass = Joi.object(schema);

	const validate = () => {
		const options = { abortEarly: false };
		const { error } = schemaClass.validate(data, options);
		if (!error) return null;

		const errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;
		return errors;
	};

	const validateProperty = ({ id, value }, subSchema) => {
		const obj = { [id]: value };
		const fieldSchema = Joi.object({ [id]: (subSchema || schema)[id] });
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

	const handleChange = ({ currentTarget: input }, subSchema) => {
		const currentErrors = { ...errors };
		const errorMessage = validateProperty(input, subSchema);

		if (errorMessage) currentErrors[input.id] = errorMessage;
		else delete currentErrors[input.id];

		const newData = { ...data };
		newData[input.id] = input.value;

		setData(newData);
		setErrors(currentErrors);
	};

	const handleSearchChange = (id, value) => {
		handleChange({ currentTarget: { id, value } });
	};

	const renderButton = (label) => (
		<button disabled={validate()} className="btn btn-primary">
			{label}
		</button>
	);

	const renderSearch = (id, items, keyPath, valuePath, headerLabel) => (
		<ReactiveSearch
			items={items}
			headerLabel={headerLabel}
			selectionLabel="Select item"
			idPath={keyPath}
			valuePath={valuePath}
			value={data[id]}
			error={errors[id]}
			onChange={(value) => handleSearchChange(id, value)}
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

	const renderInput = (
		id,
		label,
		placeholder = "",
		type = "text",
		subSchema
	) => (
		<Input
			id={id}
			label={label}
			type={type}
			placeholder={placeholder}
			value={data[id]}
			error={errors[id]}
			onChange={(e) => handleChange(e, subSchema)}
		/>
	);

	return {
		handleSubmit,
		handleChange,
		handleSearchChange,
		renderButton,
		renderSearch,
		renderSelect,
		renderInput,
	};
};

export default useForm;

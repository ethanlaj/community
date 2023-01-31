import React, { Component } from "react";
import Input from "./Input";
import Joi from "joi";
import Select from "./Select";

class Form extends Component {
	constructor(data, setData, errors, setErrors, schema, doSubmit) {
		super();

		this.data = data;
		this.setData = setData;
		this.errors = errors;
		this.setErrors = setErrors;
		this.schema = schema;
		this.schemaClass = Joi.object(schema);
		this.doSubmit = doSubmit;
	}

	validate = () => {
		const options = { abortEarly: false };
		const { error } = this.schemaClass.validate(this.data, options);
		if (!error) return null;

		const errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;
		return errors;
	};

	validateProperty = ({ id, value }) => {
		const obj = { [id]: value };
		const schema = Joi.object({ [id]: this.schema[id] });
		const { error } = schema.validate(obj);
		return error ? error.details[0].message : null;
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const errors = this.validate();
		this.setErrors(this.errors || {});
		if (errors) return;

		this.doSubmit();
	};

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.errors };
		const errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.id] = errorMessage;
		else delete errors[input.id];

		const data = { ...this.data };
		data[input.id] = input.value;

		this.setData(data);
		this.setErrors(errors);
	};

	renderButton(label) {
		return (
			<button disabled={this.validate()} className="btn btn-primary">
				{label}
			</button>
		);
	}

	renderSelect(id, label, options) {
		return (
			<Select
				id={id}
				label={label}
				options={options}
				value={this.data[id]}
				error={this.errors[id]}
				onChange={this.handleChange}
			/>
		);
	}

	renderInput(id, label, placeholder = "", type = "text") {
		return (
			<Input
				id={id}
				label={label}
				type={type}
				placeholder={placeholder}
				value={this.data[id]}
				error={this.errors[id]}
				onChange={this.handleChange}
			/>
		);
	}
}

export default Form;

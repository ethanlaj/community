import React, { Component } from "react";
import Input from "./Input";
import Joi from "joi";
import Select from "./Select";

class Form extends Component {
	constructor(schema) {
		super();

		this.schema = schema;
		this.schemaClass = Joi.object(schema);
	}

	validate = () => {
		const options = { abortEarly: false };
		const { error } = this.schemaClass.validate(this.state.data, options);
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
		this.setState({ errors: errors || {} });
		if (errors) return;

		this.doSubmit();
	};

	handleChange = ({ currentTarget: input }) => {
		const errors = { ...this.state.errors };
		const errorMessage = this.validateProperty(input);
		if (errorMessage) errors[input.id] = errorMessage;
		else delete errors[input.id];

		const data = { ...this.state.data };
		data[input.id] = input.value;

		this.setState({ data, errors });
	};

	renderButton(label) {
		return (
			<button disabled={this.validate()} className="btn btn-primary">
				{label}
			</button>
		);
	}

	renderSelect(id, label, options) {
		const { data, errors } = this.state;

		return (
			<Select
				id={id}
				label={label}
				options={options}
				value={data[id]}
				error={errors[id]}
				onChange={this.handleChange}
			/>
		);
	}

	renderInput(id, label, placeholder = "", type = "text") {
		const { data, errors } = this.state;

		return (
			<Input
				id={id}
				label={label}
				type={type}
				placeholder={placeholder}
				value={data[id]}
				error={errors[id]}
				onChange={this.handleChange}
			/>
		);
	}
}

export default Form;

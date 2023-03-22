import React, { useState } from "react";
import Joi from "joi";
import useForm from "@/shared/components/Form";

const CreateLocation = ({ onSubmit }) => {
	const [data, setData] = useState({
		name: "",
		address: "",
	});
	const [errors, setErrors] = useState({});

	const schema = {
		name: Joi.string().required().label("Name"),
		address: Joi.string().required().label("Address"),
	};

	const doSubmit = () => {
		onSubmit(data);
		setData({ name: "", address: "" });
	};

	const form = useForm(data, setData, errors, setErrors, schema, doSubmit);

	return (
		<div>
			<div>
				{form.renderInput("name", "Name", "Location name")}
				{form.renderInput("address", "Address", "Location address")}
				{form.renderButton("Add Location", "button", doSubmit)}
			</div>
		</div>
	);
};

export default CreateLocation;

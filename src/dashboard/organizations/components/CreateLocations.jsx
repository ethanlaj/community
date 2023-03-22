import React, { useState } from "react";
import Joi from "joi";
import useForm from "../../../shared/components/Form";
import Input from "../../../shared/components/Input";

const CreateLocations = ({ onLocationSubmit }) => {
	const locationSchema = {
		locationName: Joi.string().required().label("Location Name"),
		locationAddress: Joi.string().required().label("Location Address"),
	};

	const [data, setData] = useState({
		locationName: "",
		locationAddress: "",
	});

	const [errors, setErrors] = useState({});

	const doSubmit = (e) => {
		e.preventDefault();
		onLocationSubmit(data);
		setData({ locationName: "", locationAddress: "" });
	};

	const form = useForm(
		data,
		setData,
		errors,
		setErrors,
		locationSchema,
		doSubmit
	);

	// const handleAddLocation = (e) => {
	// 	form.handleSubmit(e);
	// };

	return (
		<>
			<Input
				id="locationName"
				label="Location Name"
				type="text"
				value={data.locationName}
				error={errors.locationName}
				onChange={form.handleChange}
			/>
			<Input
				id="locationAddress"
				label="Location Address"
				type="text"
				value={data.locationAddress}
				error={errors.locationAddress}
				onChange={form.handleChange}
			/>
			<button type="submit">Add Location</button>
		</>
	);
};

export default CreateLocations;

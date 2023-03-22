import Joi from "joi";
import React, { Fragment, useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import useForm from "@/shared/components/Form";
import organizationService from "@/services/organizationService";
import styles from "@/App.module.css";
import CreateLocation from "@/dashboard/organizations/components/CreateLocation";

const CreateOrganization = () => {
	//const navigate = useNavigate();
	const [data, setData] = useState({
		organizationId: null,
	});
	const [errors, setErrors] = useState({});

	const [organizations, setOrganizations] = useState([]);
	const [locations, setLocations] = useState([]);

	const handleAddLocation = (location) => {
		setLocations([...locations, location]);
	};

	useEffect(() => {
		const fetchOrganizations = async () => {
			const data = await organizationService.getAll();
			setOrganizations(data);
		};

		fetchOrganizations();
	}, []);

	const schema = {
		organizationId: Joi.number().required().label("Organization"),
	};

	const doSubmit = async () => {
		try {
			console.log("Submit to api", { ...data, locations });

			//navigate("/", { replace: true });
		} catch (ex) {
			if (ex.response && ex.response.status === 401) {
				const errorMsg = "Incorrect email or password.";

				const errorsClone = { ...errors };
				errorsClone.email = errorMsg;

				setErrors(errorsClone);
			}
		}
	};

	let form = useForm(data, setData, errors, setErrors, schema, doSubmit);
	return (
		<Fragment>
			<h1>Create Organization</h1>
			<form
				className={`${styles.formContainer}`}
				onSubmit={form.handleSubmit}
			>
				{form.renderSearch(
					"organizationId",
					organizations,
					"id",
					"name",
					"Organization"
				)}
				<h2>Locations</h2>
				{locations.map((location, index) => (
					<div key={index}>
						<p>Name: {location.name}</p>
						<p>Address: {location.address}</p>
					</div>
				))}
				<CreateLocation onSubmit={handleAddLocation} />
				{form.renderButton("Create")}
			</form>
		</Fragment>
	);
};

export default CreateOrganization;

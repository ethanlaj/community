import Joi from "joi";
import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../../../shared/components/Form";
import organizationService from "../../../../services/organizationService";

const CreateOrganization = () => {
	const navigate = useNavigate();
	const [data, setData] = useState({
		organizationId: null,
	});
	const [errors, setErrors] = useState({});

	const [organizations, setOrganizations] = useState([]);

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
			//const { email, password } = data;
			//await accountService.login(email, password);

			navigate("/", { replace: true });
		} catch (ex) {
			if (ex.response && ex.response.status === 401) {
				const errorMsg = "Incorrect email or password.";

				const errorsClone = { ...errors };
				errorsClone.email = errorMsg;

				setErrors(errorsClone);
			}
		}
	};

	let form = new Form(data, setData, errors, setErrors, schema, doSubmit);
	return (
		<Fragment>
			<h1>Create Organization</h1>
			<form className="formContainer" onSubmit={form.handleSubmit}>
				{form.renderSearch(
					"organizationId",
					organizations,
					"id",
					"name",
					"Organization"
				)}
				{form.renderButton("Create")}
			</form>
		</Fragment>
	);
};

export default CreateOrganization;

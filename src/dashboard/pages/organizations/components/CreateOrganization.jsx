import React, { Fragment, useState } from "react";
import Joi from "joi";
import useForm from "@/shared/components/Form";
// import organizationService from "@/services/organizationService";
import styles from "@/App.module.css";
import CreateLocation from "@/dashboard/organizations/components/CreateLocation";

const CreateOrganization = () => {
	const [data, setData] = useState({
		name: "",
		locations: [
			{
				name: "",
				address: "",
			},
		],
	});
	const [errors, setErrors] = useState({});

	// useEffect(() => {
	// 	const fetchOrganizations = async () => {
	// 		const data = await organizationService.getAll();
	// 		setOrganizations(data);
	// 	};

	// 	fetchOrganizations();
	// }, []);

	const schema = {
		name: Joi.string().required().label("Organization Name"),
		locations: Joi.array().items({
			name: Joi.string().required().label("Location Name"),
			address: Joi.string().required().label("Location Address"),
		}),
	};

	const doSubmit = async () => {
		try {
			console.log("Submit to api", { ...data });

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

	const form = useForm(data, setData, errors, setErrors, schema, doSubmit);

	return (
		<Fragment>
			<h1>Create Organization</h1>
			<form className={`${styles.formContainer}`}>
				{form.renderInput("name", "Name")}
				{form.renderChildForm(
					form,
					"locations",
					CreateLocation,
					data.locations
				)}
				{form.renderButton("Create")}
			</form>
		</Fragment>
	);
};

export default CreateOrganization;

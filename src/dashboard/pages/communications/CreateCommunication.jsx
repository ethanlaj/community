import React, { Fragment, useState } from "react";
import Joi from "joi";
import useForm from "@/shared/hooks/useForm";
import styles from "./CreateCommunication.module.css";
import AddContacts from "@/dashboard/pages/contacts/AddContacts";
import AddUsers from "@/dashboard/pages/users/AddUsers";
import AddLocation from "@/dashboard/pages/organizations/AddLocation";
import AddOrganization from "@/dashboard/pages/organizations/AddOrganization";
import communicationService from "@/services/communicationService";

const CreateCommunication = () => {
	const now = new Date();
	const timeZoneOffset = now.getTimezoneOffset();
	const nowLocal = new Date(now.getTime() - timeZoneOffset * 60 * 1000);

	const [data, setData] = useState({
		date: nowLocal.toISOString().substr(0, 10),
		contacts: [],
		users: [],
		note: "",
		location: null,
		organization: null,
	});
	const [errors, setErrors] = useState({});

	const schema = {
		date: Joi.date().required().label("Date"),
		contacts: Joi.array().items(Joi.number().label("Contact")).required(),
		users: Joi.array().items(Joi.number().label("User")).required(),
		note: Joi.string().allow("").label("Note"),
		location: Joi.number().allow(null).label("Location"),
		organization: Joi.any(),
	};

	const doSubmit = async () => {
		try {
			console.log("Submit to api", { ...data, locationId: data.location?.id });

			await communicationService.create({ ...data, locationId: data.location?.id });
			//navigate("/", { replace: true });
		} catch (ex) {
			console.error(ex);
		}
	};

	const form = useForm(data, setData, errors, setErrors, schema, doSubmit);

	return (
		<Fragment>
			<div>
				<h1>Create Communication</h1>
				<form className={`${styles.formContainer}`}>
					{form.renderInput("date", "Date", null, "date")}
					{form.renderInput("note", "Note", null, "textarea")}

					<h3>Organization</h3>
					{form.renderChildForm(
						form,
						"organization",
						AddOrganization,
						data.organization,
						{ organizationId: data.organization }
					)}

					<h3>Location</h3>
					{form.renderChildForm(form, "location", AddLocation, data.location, {
						organizationId: data.organization,
					})}

					<h3>Add Contacts</h3>
					<p>Which organization members were a part of this communication?</p>
					{form.renderChildForm(form, "contacts", AddContacts, data.contacts, {
						organizationId: data.organization,
					})}

					<h3>Add Users</h3>
					<p>Which Elizabethtown College staff were a part of this communication?</p>
					{form.renderChildForm(form, "users", AddUsers, data.users)}

					{form.renderButton("Create")}
				</form>
			</div>
		</Fragment>
	);
};

export default CreateCommunication;

import React, { useState, useEffect } from "react";
import organizationService from "@/services/organizationService";

const AddOrganization = ({ form, onChange }) => {
	const isChild = form !== undefined;
	const [organizations, setOrganization] = useState([]);

	const fetchOrganization = async () => {
		const organizationsResult = await organizationService.getAll();

		setOrganization(organizationsResult);
		if (form.data.organization) handleChange(null);
	};

	useEffect(() => {
		fetchOrganization();
	}, []);

	const handleChange = (id, value) => {
		onChange(value);
	};

	return (
		<div>
			{!isChild && <h1>Add Organization</h1>}
			{form.renderSearch(
				"organization",
				organizations,
				"id",
				"name",
				null,
				handleChange,
				false,
				"Search Organizations",
				fetchOrganization
			)}
		</div>
	);
};

export default AddOrganization;

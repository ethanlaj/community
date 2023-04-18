import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import locationService from "@/services/locationService";

const AddLocation = ({ form, errors, onChange, organizationId }) => {
	const isChild = form !== undefined;
	const [locations, setLocation] = useState([]);

	const fetchLocation = async () => {
		const locationsResult = await (organizationId
			? locationService.getAllByOrgId(organizationId)
			: locationService.getAll());

		setLocation(locationsResult);
		handleChange(null);
	};

	useEffect(() => {
		fetchLocation();
	}, [organizationId]);

	const handleChange = (id, value) => {
		onChange(value);
	};

	return (
		<div>
			{!isChild && <h1>Add Location</h1>}
			{form.renderSearch(
				"location",
				locations,
				"id",
				"name",
				null,
				handleChange,
				false,
				"Search Locations",
				fetchLocation
			)}

			{errors.locations && <Alert variant="danger">{errors.locations}</Alert>}
		</div>
	);
};

export default AddLocation;

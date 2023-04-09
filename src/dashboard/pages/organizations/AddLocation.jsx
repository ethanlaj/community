import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
//import locationService from "@/services/locationService";

const AddLocation = ({ form, errors, onChange }) => {
	const isChild = form !== undefined;
	const [locations, setLocation] = useState([]);

	useEffect(() => {
		const fetchLocation = async () => {
			//const locationsResult = await locationService.getAll();
			const locationsResult = [
				{
					id: 1,
					name: "Main Branch",
				},
				{
					id: 2,
					name: "Sub Branch",
				},
			];

			setLocation(locationsResult);
		};
		fetchLocation();
	}, []);

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
				"Search Locations"
			)}

			{errors.locations && <Alert variant="danger">{errors.locations}</Alert>}
		</div>
	);
};

export default AddLocation;

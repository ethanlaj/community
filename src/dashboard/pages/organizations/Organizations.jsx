import React, { Fragment, useEffect, useState } from "react";
import styles from "./Organizations.module.css?inline";
import ClickableTable from "../../../shared/components/ClickableTable";
import organizationService from "@/services/organizationService";

const Organizations = () => {
	const [organizations, setOrganizations] = useState([]);

	useEffect(() => {
		const fetchOrganizations = async () => {
			let data = await organizationService.getAll();

			data = data.map((org) => {
				let comm = org.Communication;
				if (!comm) return org;

				return {
					...org,
					lastComDate: comm.date,
					lastComOffice: comm.User.Office,
				};
			});

			setOrganizations(data);
		};

		fetchOrganizations();
	}, []);

	const columns = [
		{ title: "Name", field: "name" },
		{ title: "Last Communication Date", field: "lastComDate" },
		{ title: "Last Communication Office", field: "lastComOffice" },
	];

	const handleRowClick = (row) => {
		alert("You clicked on " + row.name);
	};
	return (
		<Fragment>
			<div className={styles.content}>
				<h1>Organizations</h1>
				<ClickableTable
					style={{ width: "20px" }}
					columns={columns}
					data={organizations}
					onRowClick={handleRowClick}
				></ClickableTable>
			</div>
		</Fragment>
	);
};

export default Organizations;

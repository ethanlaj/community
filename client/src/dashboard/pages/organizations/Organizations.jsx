import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./Organizations.module.css?inline";
import ClickableTable from "../../../shared/components/ClickableTable";
import organizationService from "@/services/organizationService";

const Organizations = () => {
	const [organizations, setOrganizations] = useState([]);

	useEffect(() => {
		const fetchOrganizations = async () => {
			let data = await organizationService.getAll();

			data = data.map((org) => {
				let comm = org.Communications[0];
				if (!comm) return org;

				return {
					...org,
					lastComDate: comm.date,
					lastComOffice: "Unknown",
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

	const handleRowDelete = async (row) => {
		let originalOrgs = [...organizations];
		try {
			setOrganizations([...organizations].filter((cont) => cont.id !== row.id));
			await organizationService.delete(row.id);

			toast.success("Organization deleted successfully");
		} catch {
			setOrganizations(originalOrgs);
		}
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
					onRowDelete={handleRowDelete}
				></ClickableTable>
			</div>
		</Fragment>
	);
};

export default Organizations;

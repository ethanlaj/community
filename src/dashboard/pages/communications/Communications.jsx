import React, { Fragment, useEffect, useState } from "react";
import styles from "./Communications.module.css?inline";
import ClickableTable from "../../../shared/components/ClickableTable";
import communicationService from "@/services/communicationService";

const Communications = () => {
	const [communications, setCommunications] = useState([]);

	useEffect(() => {
		const fetchCommunications = async () => {
			let data = await communicationService.getAll();
			console.log(data);

			data = data.map((comm) => {
				let org = comm.Organization;
				if (!org) return comm;

				return {
					...comm,
					orgName: org.name,

				};
			});

			setCommunications(data);
		};

		fetchCommunications();
	}, []);

	const columns = [
		{ title: "Organization Name", field: "orgName" },
		{ title: "Note", field: "note" },
		{ title: "Date", field: "date" },
	];

	const handleRowClick = (row) => {
		alert("You clicked on " + row.name);
	};
	return (
		<Fragment>
			<div className={styles.content}>
				<h1>Communications</h1>
				<ClickableTable
					style={{ width: "20px" }}
					columns={columns}
					data={communications}
					onRowClick={handleRowClick}
				></ClickableTable>
			</div>
		</Fragment>
	);
};

export default Communications;

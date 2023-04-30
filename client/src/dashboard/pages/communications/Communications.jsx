import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "./Communications.module.css?inline";
import ClickableTable from "../../../shared/components/ClickableTable";
import communicationService from "@/services/communicationService";

const Communications = () => {
	const [communications, setCommunications] = useState([]);

	useEffect(() => {
		const fetchCommunications = async () => {
			let data = await communicationService.getAll();

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
		{ title: "Name", field: "orgName" },
		{ title: "Note", field: "note" },
		{ title: "Date", field: "date" },
	];

	const handleRowClick = (row) => {
		alert("You clicked on " + row.orgName);
	};

	const deleteModalRenderer = (row) => {
		return <>Are you sure you want to delete the communication with {row.orgName}?</>;
	};

	const handleRowDelete = async (row) => {
		let originalComs = [...communications];
		try {
			setCommunications([...communications].filter((cont) => cont.id !== row.id));
			await communicationService.delete(row.id);

			toast.success("Communication deleted successfully");
		} catch {
			setCommunications(originalComs);
		}
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
					onRowDelete={handleRowDelete}
					deleteModalRenderer={deleteModalRenderer}
				></ClickableTable>
			</div>
		</Fragment>
	);
};

export default Communications;

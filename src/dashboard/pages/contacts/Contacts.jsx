import React, { Fragment, useEffect, useState } from "react";
import styles from "./Contacts.module.css?inline";
import ClickableTable from "../../../shared/components/ClickableTable";
import contactService from "@/services/contactService";

const Contacts = () => {
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		const fetchContacts = async () => {
			let data = await contactService.getAll();

			data = data.map((cont) => {
				let comm = cont.Communication;
				if (!comm) return cont;

				return {
					...cont,
				};
			});

			setContacts(data);
		};

		fetchContacts();
	}, []);

	const columns = [
		{ title: "Name", field: "name" },
		{ title: "Email", field: "email" },
		{ title: "Phone Number", field: "phone" },
	];

	const handleRowClick = (row) => {
		alert("You clicked on " + row.name);
	};
	return (
		<Fragment>
			<div className={styles.content}>
				<h1>Contacts</h1>
				<ClickableTable
					style={{ width: "20px" }}
					columns={columns}
					data={contacts}
					onRowClick={handleRowClick}
				></ClickableTable>
			</div>
		</Fragment>
	);
};

export default Contacts;

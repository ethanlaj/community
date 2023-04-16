//import styles from "./Contacts.module.css";
import React, { Fragment } from "react";
import styles from "./Contacts.module.css";
import ClickableTable from "../../../shared/components/ClickableTable";

const Contacts = () => {
	const columns = [
		{ title: "Name", field: "name" },
		{ title: "Last Contact Date", field: "date" },
		{ title: "Last Contact Office", field: "office" },
	];

	const data = [
		{ name: "Alice", date: 30, office: "New York" },
		{ name: "Bob", date: 25, office: "San Francisco" },
		{ name: "Charlie", date: 35, office: "Elizabethtown" },
	];

	const handleRowClick = (row) => {
		alert("You clicked on " + row.name);
	};
	return (
		<Fragment>
			<div className={styles.content}>
				<h1>Organizations</h1>
				<ClickableTable
					style={{width: "20px"}}
					columns={columns}
					data={data}
					onRowClick={handleRowClick}
				></ClickableTable>
			</div>
		</Fragment>
	);
};

export default Contacts;

import React, { useState, useEffect } from "react";
import { Alert, Button, Table } from "react-bootstrap";
import contactService from "@/services/contactService";

const AddContacts = ({ form, data, errors, onChange }) => {
	const isChild = form !== undefined;
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		const fetchContacts = async () => {
			const contactsResult = await contactService.getAll();
			setContacts(contactsResult);
		};
		fetchContacts();
	}, []);

	const handleAddContact = (id, value) => {
		onChange([...data, value]);
	};

	const handleDeleteContact = (contactId) => {
		const updatedContacts = data.filter((id) => id !== contactId);
		onChange(updatedContacts);
	};

	return (
		<div>
			{!isChild && <h1>Add Contacts</h1>}
			{form.renderSearch(
				"contact",
				contacts.filter((c) => !data.includes(c.id)),
				"id",
				"name",
				null,
				handleAddContact,
				true,
				"Search Contacts"
			)}

			{errors.contacts && (
				<Alert variant="danger">{errors.contacts}</Alert>
			)}
			{data.length > 0 && (
				<Table striped bordered>
					<thead>
						<tr>
							<th>Added Contacts</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{data.map((contactId) => (
							<tr key={contactId}>
								<td>
									{
										contacts.find((c) => c.id === contactId)
											?.name
									}
								</td>
								<td>
									<Button
										variant="danger"
										onClick={() =>
											handleDeleteContact(contactId)
										}
									>
										Delete
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</div>
	);
};

export default AddContacts;

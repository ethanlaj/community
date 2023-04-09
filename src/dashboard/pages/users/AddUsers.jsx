import React, { useState, useEffect } from "react";
import { Alert, Button, Table } from "react-bootstrap";
//import userService from "@/services/userService";

const AddUsers = ({ form, data, errors, onChange }) => {
	const isChild = form !== undefined;
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			//const usersResult = await userService.getAll();
			const usersResult = [
				{
					id: 1,
					name: "User 1",
				},
				{
					id: 2,
					name: "User 2",
				},
			];

			setUsers(usersResult);
		};
		fetchUsers();
	}, []);

	const handleAddUser = (id, value) => {
		onChange([...data, value]);
	};

	const handleDeleteUser = (userId) => {
		const updatedUsers = data.filter((id) => id !== userId);
		onChange(updatedUsers);
	};

	return (
		<div>
			{!isChild && <h1>Add Users</h1>}
			{form.renderSearch(
				"user",
				users.filter((c) => !data.includes(c.id)),
				"id",
				"name",
				null,
				handleAddUser,
				true,
				"Search Users"
			)}

			{errors.users && <Alert variant="danger">{errors.users}</Alert>}
			{data.length > 0 && (
				<Table striped bordered>
					<thead>
						<tr>
							<th>Added Users</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{data.map((userId) => (
							<tr key={userId}>
								<td>{users.find((c) => c.id === userId)?.name}</td>
								<td>
									<Button
										variant="danger"
										onClick={() => handleDeleteUser(userId)}
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

export default AddUsers;

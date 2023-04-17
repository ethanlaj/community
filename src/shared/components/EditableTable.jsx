import React, { Fragment } from "react";
import { Table, Button, Form, Alert } from "react-bootstrap";

const EditableTable = ({ columns, data, error, onAdd, onUpdate }) => {
	const handleDelete = (rowIndex) => {
		const updatedData = data.filter((_, index) => index !== rowIndex);
		onUpdate(updatedData);
	};

	const handleUpdate = (rowIndex, column, newValue) => {
		const updatedData = data.map((row, index) =>
			index === rowIndex ? { ...row, [column.field]: newValue } : row
		);
		onUpdate(updatedData);
	};

	return (
		<Fragment>
			{error && <Alert variant="danger">{error}</Alert>}
			<Table className="mb-1" striped bordered>
				<thead>
					<tr>
						{columns.map((column, index) => (
							<th key={index}>{column.title}</th>
						))}
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{data.map((row, rowIndex) => (
						<tr key={rowIndex}>
							{columns.map((column, colIndex) => (
								<td key={colIndex}>
									<Form.Control
										type="text"
										value={row[column.field]}
										onChange={(e) =>
											handleUpdate(rowIndex, column, e.target.value)
										}
									/>
								</td>
							))}
							<td>
								<Button onClick={() => handleDelete(rowIndex)}>Delete</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
			<Button className="mb-2" onClick={onAdd}>
				Add Row
			</Button>
		</Fragment>
	);
};

export default EditableTable;

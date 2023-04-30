import React, { useContext } from "react";
import styles from "./ClickableTable.module.css";
import { Table, Button } from "react-bootstrap";
import { ModalContext } from "./ModalContext";

const ClickableTable = ({ columns, data, onRowClick, onRowDelete, deleteModalRenderer }) => {
	const { openModal } = useContext(ModalContext);

	function handleDeleteClick(e, row) {
		e.stopPropagation();

		const title = "Confirm Deletion";
		const content = `Are you sure you want to delete ${row.name}?`;

		openModal(
			{
				title,
				content,
				ContentComponent: deleteModalRenderer ? () => deleteModalRenderer(row) : null,
				confirmVariant: "danger",
			},
			() => onRowDelete(row)
		);
	}

	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					{columns.map((column, index) => (
						<th key={index}>{column.title}</th>
					))}
					{onRowDelete && <th></th>}
				</tr>
			</thead>
			<tbody>
				{data.map((row, rowIndex) => (
					<tr key={rowIndex} onClick={() => onRowClick(row)}>
						{columns.map((column, colIndex) => (
							<td key={colIndex}>{row[column.field]}</td>
						))}
						{onRowDelete && (
							<td className={styles.deleteColumn}>
								<Button variant="danger" onClick={(e) => handleDeleteClick(e, row)}>
									Delete
								</Button>
							</td>
						)}
					</tr>
				))}
			</tbody>
		</Table>
	);
};

export default ClickableTable;

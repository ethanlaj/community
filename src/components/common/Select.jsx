import React from "react";
import { Alert, Form } from "react-bootstrap";

/**
 * Options should be:
 * [
 * 		{value: Value, name: Name},
 * 		{value: Value, name: Name},
 * ]
 * Where name is the property displayed to the user
 */
const Select = ({ error, id, label, options, blankOption = true, ...rest }) => {
	return (
		<Form.Group className="mb-3" controlId={id}>
			<Form.Label>{label}</Form.Label>
			<Form.Select {...rest}>
				{blankOption && <option value=""></option>}
				{options.map((o) => (
					<option key={o.value} value={o.value}>
						{o.name}
					</option>
				))}
			</Form.Select>
			{error && <Alert variant="danger">{error}</Alert>}
		</Form.Group>
	);
};

export default Select;

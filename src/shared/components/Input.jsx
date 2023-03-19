import React from "react";
import { Alert, Form } from "react-bootstrap";

const Input = ({ error, name, label, ...rest }) => {
	return (
		<Form.Group className="mb-3" controlId={name}>
			<Form.Label>{label}</Form.Label>
			<Form.Control {...rest} />
			{error && <Alert variant="danger">{error}</Alert>}
		</Form.Group>
	);
};

export default Input;

import React from "react";
import { Alert, Form } from "react-bootstrap";

const Input = ({ error, name, label, type, ...rest }) => {
	return (
		<Form.Group className="mb-3" controlId={name}>
			<Form.Label>{label}</Form.Label>
			<Form.Control type={type} {...rest} as={type === "textarea" ? "textarea" : undefined} />
			{error && <Alert variant="danger">{error}</Alert>}
		</Form.Group>
	);
};

export default Input;

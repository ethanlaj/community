import { Component } from "react";
import { Formik } from "formik";
import { Form as FormElement, Alert, Button } from "react-bootstrap";

/**
 * This component should be deleted. TODO: Uninstall formik: npm uninstall formik
 */
class FormFormik extends Component {
	render() {
		const { inputs } = this.props;

		return (
			<div>
				<Formik
					initialValues={{ email: "", password: "" }}
					validate={(values) => {
						const errors = {};

						if (!values.email) {
							errors.email = "Required";
						} else if (
							!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
								values.email
							)
						) {
							errors.email = "Invalid email address";
						}

						return errors;
					}}
					handleSubmit={(values, { setSubmitting }) => {
						setTimeout(() => {
							alert(JSON.stringify(values, null, 2));

							setSubmitting(false);
						}, 400);
					}}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting,
					}) => (
						<FormElement onSubmit={handleSubmit}>
							<FormElement.Group
								className="mb-3"
								controlId="email"
							>
								<FormElement.Label>
									Email address
								</FormElement.Label>
								<FormElement.Control
									type="email"
									name="email"
									placeholder="Enter email"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
								/>
								{errors.email && touched.email && (
									<Alert variant="danger">
										{errors.email}
									</Alert>
								)}
							</FormElement.Group>
							<FormElement.Group
								className="mb-3"
								controlId="password"
							>
								<FormElement.Label>Password</FormElement.Label>
								<FormElement.Control
									type="password"
									name="password"
									placeholder="Enter password"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.password}
								/>
								{errors.password && touched.password && (
									<Alert variant="danger">
										{errors.password}
									</Alert>
								)}
							</FormElement.Group>

							<Button variant="primary" disabled={isSubmitting}>
								Submit
							</Button>
						</FormElement>
					)}
				</Formik>
			</div>
		);
	}
}

export default FormFormik;

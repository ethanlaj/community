import { Fragment } from "react";
import Joi from "joi";
import Form from "./common/Form";

class LoginForm extends Form {
	state = {
		data: { email: "", password: "", test: "" },
		errors: {},
	};

	schema = {
		email: Joi.string().required().label("Email"),
		password: Joi.string().required().label("Password"),
		test: Joi.string().required(),
	};
	schemaClass = Joi.object(this.schema);

	doSubmit = async () => {
		console.log("Submitted");
	};

	render() {
		const options = [
			{ value: "value1", name: "name1" },
			{ value: "value2", name: "name2" },
		];
		return (
			<Fragment>
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					{this.renderInput(
						"email",
						"Email",
						"Enter your email address"
					)}
					{this.renderInput(
						"password",
						"Password",
						"Enter your password",
						"password"
					)}
					{this.renderSelect("test", "test", options)}
					{this.renderButton("Login")}
				</form>
			</Fragment>
		);
	}
}

export default LoginForm;

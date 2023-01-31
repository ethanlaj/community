import { Fragment } from "react";
import Joi from "joi";
import Form from "./common/Form";
import accountService from "../services/accountService";

class LoginForm extends Form {
	constructor() {
		const schema = {
			email: Joi.string().required().label("Email"),
			password: Joi.string().required().label("Password"),
		};

		super(schema);
	}

	state = {
		data: { email: "", password: "" },
		errors: {},
	};

	doSubmit = async () => {
		try {
			const { email, password } = this.state.data;
			await accountService.login(email, password);

			//const { state } = this.props.location;
			//window.location = state ? state.from.pathname : "/";
		} catch (ex) {
			if (ex.response && ex.response.status === 401) {
				const errors = { ...this.state.errors };
				errors.email = "Incorrect email or password.";
				this.setState({ errors });
			}
		}
	};

	render() {
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
					{this.renderButton("Login")}
				</form>
			</Fragment>
		);
	}
}

export default LoginForm;

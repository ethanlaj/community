import { Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Joi from "joi";
import Form from "../../../../shared/components/Form";
import accountService from "../../../../services/accountService";
import { getCurrentUser } from "../../../../services/jwtService";

const LoginForm = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  let from = location.state?.from?.pathname || "/";

  let currentUser = getCurrentUser();
  if (currentUser?.userID) {
    navigate(from, { replace: true });
  }

  const schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  const doSubmit = async () => {
    try {
      const { email, password } = data;
      await accountService.login(email, password);

      navigate(from, { replace: true });
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        const errorMsg = "Incorrect email or password.";

        const errorsClone = { ...errors };
        errorsClone.email = errorMsg;

        setErrors(errorsClone);
      }
    }
  };

  let form = new Form(data, setData, errors, setErrors, schema, doSubmit);
  return (
    <Fragment>
      <h1>Login</h1>
      <form onSubmit={form.handleSubmit}>
        {form.renderInput("email", "Email", "Enter your email address")}
        {form.renderInput(
          "password",
          "Password",
          "Enter your password",
          "password"
        )}
        {form.renderButton("Login")}
      </form>
    </Fragment>
  );
};

export default LoginForm;

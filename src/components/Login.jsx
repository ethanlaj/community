import React, { useState } from "react";

const Login = () => {
	const [value, updateValue] = useState("");

	function onChange(e) {
		updateValue(e.currentTarget.value);
	}

	return (
		<div>
			<input value={value} onChange={onChange}></input>
		</div>
	);
};

export default Login;

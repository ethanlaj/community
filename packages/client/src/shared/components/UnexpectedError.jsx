import React from "react";
import { useRouteError, Link } from "react-router-dom";

export default function UnexpectedError() {
	const error = useRouteError();
	console.error(error);

	return (
		<div id="error-page">
			<h1>Oops!</h1>
			<p>
				Sorry, an unexpected error has occurred:{" "}
				<i>{error.statusText || error.message}</i>
			</p>

			<Link to="/">Go Home</Link>
		</div>
	);
}

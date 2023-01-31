import { Link } from "react-router-dom";

export default function Unauthorized() {
	return (
		<div id="error-page">
			<h1>Unauthorized</h1>

			<Link to="/">Go Home</Link>
		</div>
	);
}

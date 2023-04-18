import React from "react";
import styles from "./Errors.module.css";
import { Link } from "react-router-dom";

function NotFound() {
	return (
		<div className={styles.textCenter}>
			<h1>404 - Not Found</h1>
			<p>Sorry, the page you are looking for does not exist.</p>
			<Link to="/">Go Home</Link>
		</div>
	);
}

export default NotFound;

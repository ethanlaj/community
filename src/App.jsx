import React from "react";
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UnexpectedError from "./shared/components/UnexpectedError";
import Unauthorized from "./shared/components/Unauthorized";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
//import styles from "./App.module.css"; // Make sure to use .module.css
import CreateOrganization from "./dashboard/pages/organizations/CreateOrganization";
import Organizations from "./dashboard/pages/organizations/Organizations";

function App() {
	return (
		<Fragment>
			<ToastContainer />
			<Router>
				<Routes>
					<Route path="/" element={<Organizations />} />
					<Route
						path="/create-organization"
						element={<CreateOrganization />}
					/>
					<Route path="/contacts" />
					<Route path="/communications" />
					<Route path="/unauthorized" element={<Unauthorized />} />
					<Route path="*" element={<UnexpectedError />} />
				</Routes>
			</Router>
		</Fragment>
	);
}

export default App;

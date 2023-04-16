import React from "react";
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import UnexpectedError from "./shared/components/UnexpectedError";
import Unauthorized from "./shared/components/Unauthorized";
import Sidebar from "./shared/components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import styles from "./App.module.css";
import CreateOrganization from "./dashboard/pages/organizations/CreateOrganization";
import CreateCommunication from "./dashboard/pages/communications/CreateCommunication";
import Organizations from "./dashboard/pages/organizations/Organizations";
import Contacts from "./dashboard/pages/contacts/Contacts";
import Communications from "./dashboard/pages/communications/Communications";

function App() {
	return (
		<Fragment>
			<div className={styles.content}>
				<ToastContainer />
				<Router>
					<Sidebar />
					<Routes>
						<Route path="/" element={<Organizations />} />
						<Route path="/create-organization" element={<CreateOrganization />} />
						<Route path="/contacts" element={<Contacts/>}/>
						<Route path="/communications" element={<Communications/>}/>
						<Route path="/create-communication" element={<CreateCommunication />} />
						<Route path="/unauthorized" element={<Unauthorized />} />
						<Route path="*" element={<UnexpectedError />} />
					</Routes>
				</Router>
			</div>
		</Fragment>
	);
}

export default App;

import React from "react";
import { Nav, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = ({ activeKey, onSelect }) => {
	return (
		<Col
			xs={3}
			md={2}
			className={`${styles.sidebar} d-none d-md-block bg-light sidebar`}
		>
			<Nav className="flex-column" activeKey={activeKey} onSelect={onSelect}>
				<Nav.Item>
					<Link to="/admin" className="nav-link" eventKey="Admin">
            Admin
					</Link>
				</Nav.Item>
				<Nav.Item>
					<Link to="/" className="nav-link" eventKey="Organizations">
            Organizations
					</Link>
				</Nav.Item>
				<Nav.Item>
					<Link to="/contacts" className="nav-link" eventKey="Contacts">
            Contacts
					</Link>
				</Nav.Item>
				<Nav.Item>
					<Link to="/communications" className="nav-link" eventKey="Communications">
            Communications
					</Link>
				</Nav.Item>
			</Nav>
		</Col>
	);
};

export default Sidebar;

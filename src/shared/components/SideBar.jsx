import React from "react";
import { Nav, Col } from "react-bootstrap";
import styles from "./Sidebar.module.css";

const Sidebar = ({ activeKey, onSelect }) => {
  return (
    <Col
      xs={3}
      md={2}
      className={`${styles.sidebar} d-none d-md-block bg-light sidebar`}
    >
      <Nav className="flex-column" activeKey={activeKey} onSelect={onSelect}>
        <Nav.Link eventKey="Admin">Admin</Nav.Link>
        <Nav.Link eventKey="Organizations">Organizations</Nav.Link>
        <Nav.Link eventKey="Contacts">Contacts</Nav.Link>
        <Nav.Link eventKey="Communications">Communications</Nav.Link>
      </Nav>
    </Col>
  );
};

export default Sidebar;

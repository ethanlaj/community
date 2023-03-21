import React from "react";
import { Nav, Col } from "react-bootstrap";

const Sidebar = ({ activeKey, onSelect }) => {
  return (
    <Col xs={3} md={2} className="d-none d-md-block bg-light sidebar">
      <Nav className="flex-column" activeKey={activeKey} onSelect={onSelect}>
        <Nav.Link eventKey="home">Home</Nav.Link>
        <Nav.Link eventKey="profile">Profile</Nav.Link>
        <Nav.Link eventKey="settings">Settings</Nav.Link>
        <Nav.Link eventKey="help">Help</Nav.Link>
      </Nav>
    </Col>
  );
};

export default Sidebar;

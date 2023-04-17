import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = ({ activeKey, onSelect }) => {
	return (
		<div className={styles.sidebar}>
			<ul className={styles.nav}>
				<li className={styles.navItem}>
					<NavLink to="/admin" activeClassName={styles.activeNavLink}>
            Admin
					</NavLink>
				</li>
				<li className={styles.navItem}>
					<NavLink to="/" exact activeClassName={styles.activeNavLink}>
            Organizations
					</NavLink>
				</li>
				<li className={styles.navItem}>
					<NavLink to="/contacts" activeClassName={styles.activeNavLink}>
            Contacts
					</NavLink>
				</li>
				<li className={styles.navItem}>
					<NavLink to="/communications" activeClassName={styles.activeNavLink}>
            Communications
					</NavLink>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;

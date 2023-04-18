import React,{useState} from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";


const Sidebar = () => {
	const [isExpanded, setIsExpanded] = useState({ org: false, comm: false, cont:false });
	const handleExpandClick = (section) => {
		setIsExpanded({ ...isExpanded, [section]: !isExpanded[section] });
	  };
	
	return (
		<div className={styles.sidebar}>
			<ul className={styles.nav}>
				<li className={styles.navItem}>
					<NavLink to="/admin" activeclassname={styles.activeNavLink}>
            Admin
					</NavLink>
				</li>
				<li className={styles.navItem}>
					<div onClick={() => handleExpandClick("org")}>
						<NavLink to="/organizations" activeclassname={styles.activeNavLink}>
              Organizations
						</NavLink>
						<span className={isExpanded.org ? styles.arrowUp : styles.arrowDown} />
					</div>
					{isExpanded.org && (
						<ul className={styles.subNav}>
							<li className={styles.subNavItem}>
								<NavLink to="/organizations/create" activeclassname={styles.activeNavLink}>
                  - Create
								</NavLink>
							</li>
						</ul>
					)}
				</li>
				<li className={styles.navItem}>
					<div onClick={() => handleExpandClick("cont")}>
						<NavLink to="/contacts" activeclassname={styles.activeNavLink}>
              Contacts
						</NavLink>
						<span className={isExpanded.cont ? styles.arrowUp : styles.arrowDown} />
					</div>
					{isExpanded.cont && (
						<ul className={styles.subNav}>
							<li className={styles.subNavItem}>
								<NavLink to="/contacts/create" activeclassname={styles.activeNavLink}>
                  - Create
								</NavLink>
							</li>
						</ul>
					)}
				</li>
				<li className={styles.navItem}>
					<div onClick={() => handleExpandClick("comm")}>
						<NavLink to="/contacts" activeclassname={styles.activeNavLink}>
              Communications
						</NavLink>
						<span className={isExpanded.comm ? styles.arrowUp : styles.arrowDown} />
					</div>
					{isExpanded.comm && (
						<ul className={styles.subNav}>
							<li className={styles.subNavItem}>
								<NavLink to="/communications/create" activeclassname={styles.activeNavLink}>
                  - Create
								</NavLink>
							</li>
						</ul>
					)}
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;

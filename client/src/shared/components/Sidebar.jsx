import React,{useState, useCallback} from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";


const Sidebar = () => {
	const [isExpanded, setIsExpanded] = useState({ org: false, comm: false });
	const handleExpandClick = (section) => {
		setIsExpanded({ ...isExpanded, [section]: !isExpanded[section] });
	  };
	
	return (
		<div className={styles.sidebar}>
			<ul className={styles.nav}>
				<li className={styles.navItem}>
					<NavLink to="/admin" activeClassName={styles.activeNavLink}>
            Admin
					</NavLink>
				</li>
				<li className={styles.navItem}>
					<div onClick={() => handleExpandClick("org")}>
						<NavLink to="/organizations" activeClassName={styles.activeNavLink}>
              Organizations
						</NavLink>
						<span className={isExpanded.org ? styles.arrowUp : styles.arrowDown} />
					</div>
					{isExpanded.org && (
						<ul className={styles.subNav}>
							<li className={styles.subNavItem}>
								<NavLink to="/create-organization" activeClassName={styles.activeNavLink}>
                  - Create
								</NavLink>
							</li>
						</ul>
					)}
				</li>
				<li className={styles.navItem}>
					<div onClick={() => handleExpandClick("comm")}>
						<NavLink to="/communications" activeClassName={styles.activeNavLink}>
              Communications
						</NavLink>
						<span className={isExpanded.comm ? styles.arrowUp : styles.arrowDown} />
					</div>
					{isExpanded.comm && (
						<ul className={styles.subNav}>
							<li className={styles.subNavItem}>
								<NavLink to="/create-communication" activeClassName={styles.activeNavLink}>
                  - Create
								</NavLink>
							</li>
						</ul>
					)}
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

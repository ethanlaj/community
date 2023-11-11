import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthButton from './AuthButton';
import styles from './Sidebar.module.css';

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState({ org: false, comm: false, cont: false });
  const handleExpandClick = (section) => {
    setIsExpanded({ ...isExpanded, [section]: !isExpanded[section] });
  };

  return (
    <div className={`${styles.sidebar} flex flex-col`}>
      <ul className={styles.nav}>
        <li className={styles.navItem}>
          <div onClick={() => handleExpandClick('user')}>
            <NavLink to="/admin" activeclassname={styles.activeNavLink}>
              Admin
            </NavLink>
            <span className={isExpanded.user ? styles.arrowUp : styles.arrowDown} />
          </div>
          {isExpanded.user && (
            <ul className={styles.subNav}>
              <li className={styles.subNavItem}>
                <NavLink to="/admin/add-user" activeclassname={styles.activeNavLink}>
                  - Add User
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        <li className={styles.navItem}>
          <div onClick={() => handleExpandClick('org')}>
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
          <div onClick={() => handleExpandClick('cont')}>
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
          <div onClick={() => handleExpandClick('comm')}>
            <NavLink to="/communications" activeclassname={styles.activeNavLink}>
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
      <AuthButton />
    </div>
  );
}

export default Sidebar;

import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import AuthButton from './AuthButton';
import styles from './Sidebar.module.css';
import ProtectedElement from './ProtectedElement';

function Sidebar() {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState({ org: false, comm: false, cont: false });
  const handleExpandClick = (section) => {
    setIsExpanded({ ...isExpanded, [section]: !isExpanded[section] });
  };

  return (
    <div className={`${styles.sidebar} flex flex-col`}>
      <ProtectedElement minLevel={2}>
        <li className={styles.nav}>
          <div onClick={() => null}>
            <NavLink to="/" activeclassname={styles.activeNavLink}>
              <img src="/ElizabethtownLogo.png" alt="Logo" className={styles.logoImage} />
            </NavLink>
          </div>
        </li>
      </ProtectedElement>
      <ul className={styles.nav}>
        <ProtectedElement minLevel={4}>
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
        </ProtectedElement>
        <li className={styles.navItem}>
          <div onClick={() => handleExpandClick('org')}>
            <NavLink to="/organizations" activeclassname={styles.activeNavLink}>
              Organizations
            </NavLink>
            <span className={isExpanded.org ? styles.arrowUp : styles.arrowDown} />
          </div>
          {isExpanded.org && (
            <ProtectedElement minLevel={2}>
              <ul className={styles.subNav}>
                <li className={styles.subNavItem}>
                  <NavLink to="/organizations/create" activeclassname={styles.activeNavLink}>
                    - Create
                  </NavLink>
                </li>
              </ul>
            </ProtectedElement>
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
            <ProtectedElement minLevel={2}>
              <ul className={styles.subNav}>
                <li className={styles.subNavItem}>
                  <NavLink to="/contacts/create" activeclassname={styles.activeNavLink}>
                    - Create
                  </NavLink>
                </li>
              </ul>
            </ProtectedElement>
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
            <ProtectedElement minLevel={2}>
              <ul className={styles.subNav}>
                <li className={styles.subNavItem}>
                  <NavLink to="/communications/create" activeclassname={styles.activeNavLink}>
                    - Create
                  </NavLink>
                </li>
              </ul>
            </ProtectedElement>
          )}
        </li>
      </ul>
      {location.pathname !== '/' && (
        <AuthButton />
      )}
    </div>
  );
}

export default Sidebar;

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider, useMsal } from '@azure/msal-react';
import UnexpectedError from './shared/components/UnexpectedError';
import NotFound from './shared/components/NotFound';
import Unauthorized from './shared/components/Unauthorized';
import Sidebar from './shared/components/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';
import CreateUpdateOrganization from './dashboard/pages/organizations/CreateUpdateOrganization';
import CreateCommunication from './dashboard/pages/communications/CreateCommunication';
import Organizations from './dashboard/pages/organizations/Organizations';
import Organization from './dashboard/pages/organization/Organization';
import Contacts from './dashboard/pages/contacts/Contacts';
import Communications from './dashboard/pages/communications/Communications';
import { ModalProvider } from './shared/components/ModalContext';
import CreateContacts from './dashboard/pages/contacts/CreateContacts';
import ProtectedRoute from './shared/components/ProtectedRoute';
import { msalConfig } from './config';
import useInterceptor from './shared/hooks/useInterceptor';
import Loading from './shared/components/Loading';
import Home from './dashboard/pages/Home';
import Admin from './dashboard/pages/admin';
import AddUsers from './dashboard/pages/admin/CreateUsers';
import { UserProvider } from './shared/context/UserContext';

const msalInstance = new PublicClientApplication(msalConfig);

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const setInterceptors = useInterceptor(msalInstance);
  const { accounts, inProgress } = useMsal();
  const account = accounts[0];

  useEffect(() => {
    if (inProgress === 'none') {
      setInterceptors(msalInstance, account);
      setIsLoading(false);
    }
  }, [inProgress, account]);

  if (isLoading) {
    return <Loading />;
  }

  const protectedRoutes = [
    { path: '/organizations/create', element: <CreateUpdateOrganization /> },
    { path: '/organizations', element: <Organizations /> },
    { path: '/contacts', element: <Contacts /> },
    { path: '/contacts/create', element: <CreateContacts /> },
    { path: '/communications', element: <Communications /> },
    { path: '/communications/create', element: <CreateCommunication /> },
    { path: '/organization/:id', element: <Organization /> },
    { path: '/organization/:id/edit', element: <CreateUpdateOrganization /> },
    { path: '/admin', element: <Admin /> },
    { path: '/admin/add-user', element: <AddUsers /> },
  ];

  return (
    <div className={styles.content}>
      <UserProvider>
        <Sidebar />
        <ErrorBoundary FallbackComponent={UnexpectedError}>
          <Routes>
            {protectedRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<ProtectedRoute>{route.element}</ProtectedRoute>}
              />
            ))}
            <Route path="/" element={<Home />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </UserProvider>
    </div>
  );
}

function App() {
  return (
    <ModalProvider>
      <ToastContainer />
      <MsalProvider instance={msalInstance}>
        <Router>
          <AppContent />
        </Router>
      </MsalProvider>
    </ModalProvider>
  );
}

export default App;

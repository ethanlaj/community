import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import UnexpectedError from './shared/components/UnexpectedError';
import NotFound from './shared/components/NotFound';
import Unauthorized from './shared/components/Unauthorized';
import Sidebar from './shared/components/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';
import CreateOrganization from './dashboard/pages/organizations/CreateOrganization';
import CreateCommunication from './dashboard/pages/communications/CreateCommunication';
import Organizations from './dashboard/pages/organizations/Organizations';
import Contacts from './dashboard/pages/contacts/Contacts';
import Communications from './dashboard/pages/communications/Communications';
import { ModalProvider } from './shared/components/ModalContext';
import CreateContacts from './dashboard/pages/contacts/CreateContacts';
import ProtectedRoute from './shared/components/ProtectedRoute';
import { msalConfig } from './config';

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
  return (
    <ModalProvider>
      <ToastContainer />
      <MsalProvider instance={msalInstance}>
        <Router>
          <div className={styles.content}>
            <Sidebar />
            <ErrorBoundary FallbackComponent={UnexpectedError}>
              <Routes>
                <Route path="/" element={<Organizations />} />
                <Route path="apple" element={<ProtectedRoute><div>Apple</div></ProtectedRoute>} />
                <Route path="/organizations/create" element={<CreateOrganization />} />
                <Route path="/organizations" element={<Organizations />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/contacts/create" element={<CreateContacts />} />
                <Route path="/communications" element={<Communications />} />
                <Route
                  path="/communications/create"
                  element={<CreateCommunication />}
                />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </div>
        </Router>
      </MsalProvider>
    </ModalProvider>
  );
}

export default App;

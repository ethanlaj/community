import { useMsal } from '@azure/msal-react';

function ProtectedRoute({ children }) {
  const { instance, accounts } = useMsal();
  const account = accounts[0];

  if (!account) {
    instance.loginRedirect();
    return <div>Loading...</div>;
  }

  return children;
}

export default ProtectedRoute;

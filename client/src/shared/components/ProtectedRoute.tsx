import { useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { useEffect } from 'react';
import Loading from './Loading';
import { msalRequest } from '@/config';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { instance, accounts, inProgress } = useMsal();
  const account = accounts[0];

  useEffect(() => {
    if (inProgress === InteractionStatus.None && !account) {
      instance.loginRedirect(msalRequest);
    }
  }, [instance, account, inProgress]);

  if (!account || inProgress !== InteractionStatus.None) {
    return <Loading />;
  }

  return children;
}

export default ProtectedRoute;

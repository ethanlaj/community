import { Button } from 'react-bootstrap';
import { useMsal } from '@azure/msal-react';
import { msalRequest } from '@/config';
import useUserData from '../hooks/useUserData';

function AuthButton() {
  const { accounts, instance } = useMsal();
  const { clear } = useUserData();

  const account = accounts[0];
  const nameParts = account?.name?.split(',');
  const firstName = nameParts ? nameParts[1].trim().split(' ')[0] : 'User';

  const logout = () => {
    clear();

    instance.logoutRedirect({
      postLogoutRedirectUri: window.location.origin,
    });
  };

  if (account) {
    return (
      <div className="mt-auto p-4">
        <div className="mb-2 text-center text-lg font-semibold">{`Welcome, ${firstName}!`}</div>
        <Button variant="danger" onClick={logout} className="w-full">
          Logout
        </Button>
      </div>
    );
  }
  return (
    <div className="mt-auto p-4">
      <Button variant="primary" onClick={() => instance.loginRedirect(msalRequest)} className="w-full">
        Login
      </Button>
    </div>
  );
}

export default AuthButton;

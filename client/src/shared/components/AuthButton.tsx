import { Button } from 'react-bootstrap';
import { useMsal } from '@azure/msal-react';
import { msalRequest } from '@/config';

function AuthButton() {
  const { accounts, instance } = useMsal();
  const account = accounts[0];
  const firstName = account?.name?.split(' ')[1] || 'User';

  if (account) {
    return (
      <div className="mt-auto bg-gray-100 p-4">
        <div className="mb-2 text-center text-lg font-semibold">{`Welcome, ${firstName}!`}</div>
        <Button variant="danger" onClick={() => instance.logoutRedirect()} className="w-full">
          Logout
        </Button>
      </div>
    );
  }
  return (
    <div className="mt-auto bg-gray-100 p-4">
      <Button variant="primary" onClick={() => instance.loginRedirect(msalRequest)} className="w-full">
        Login
      </Button>
    </div>
  );
}

export default AuthButton;

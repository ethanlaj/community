import { Button } from 'react-bootstrap';
import { useMsal } from '@azure/msal-react';
import { msalRequest } from '@/config';
import useUserData from '../hooks/useUserData';
import styles from './AuthButton.module.css';

interface AuthButtonProps {
  isWhiteText?: boolean;
}
function AuthButton({ isWhiteText }: AuthButtonProps) {
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

  const textClass = isWhiteText ? 'text-white' : 'text-black';

  if (account) {
    return (
      <div className={`mt-auto p-4 ${textClass}`}>
        <div className={styles.welcome}>{`Welcome, ${firstName}!`}</div>
        <Button variant="danger" onClick={logout} className="w-full">
          Logout
        </Button>
      </div>
    );
  }

  return (
    <div className={`p-4 ${textClass}`}>
      <Button variant="primary" onClick={() => instance.loginRedirect(msalRequest)} className="w-full">
        Login
      </Button>
    </div>
  );
}

export default AuthButton;

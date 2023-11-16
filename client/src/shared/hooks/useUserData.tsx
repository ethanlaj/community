import { useMsal } from '@azure/msal-react';
import UserService from '@/services/userService';
import { MeUser } from '@/types/meUser';

const useUserData = () => {
  const { accounts } = useMsal();
  const account = accounts[0];

  async function get(): Promise<MeUser | null> {
    if (!account) {
      return null;
    }

    const userString = localStorage.getItem('user');

    if (userString) {
      const user = JSON.parse(userString);
      user.expires = new Date(user.expires);
      if (user.expires > new Date()) {
        return user;
      }
    }

    const user = await UserService.getMe();
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  function clear() {
    localStorage.removeItem('user');
  }

  return ({
    get,
    clear,
  });
};

export default useUserData;

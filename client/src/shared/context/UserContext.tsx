import { createContext, useState, useEffect } from 'react';
import useUserData from '../hooks/useUserData';
import { MeUser } from '@/types/meUser';

const fiveMinutesFromNow = new Date(new Date().getTime() + 5 * 60 * 1000);
const defaultUser: MeUser = {
  permissionLevel: -1,
  expires: fiveMinutesFromNow,
};

export const UserContext = createContext<MeUser>(defaultUser);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { get } = useUserData();
  const [userData, setUserData] = useState<MeUser>(defaultUser);

  useEffect(() => {
    get()
      .then((newData) => {
        setUserData(newData || defaultUser);
      }).catch(console.error);
  }, []);

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
}

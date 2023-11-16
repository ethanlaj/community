import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

interface ProtectedElementProps {
  children: React.ReactNode;
  minLevel: number;
}

function ProtectedElement({ children, minLevel }: ProtectedElementProps) {
  const userData = useContext(UserContext);

  if (userData.permissionLevel >= minLevel) {
    return children;
  }

  return null;
}

export default ProtectedElement;

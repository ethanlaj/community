import React from 'react';
import { Button } from 'react-bootstrap';
import { IoIosArrowBack } from 'react-icons/io';

interface BackButtonProps {
  children: React.ReactNode;
  handleClick: () => void;
}

function BackButton({ children, handleClick }: BackButtonProps) {
  return (
    <Button variant="outline-secondary" className="absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center gap-1" onClick={handleClick}>
      <IoIosArrowBack />
      {children}
    </Button>
  );
}

export default BackButton;

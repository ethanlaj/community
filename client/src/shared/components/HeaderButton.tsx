import React from 'react';
import { Button } from 'react-bootstrap';

interface HeaderButtonProps {
  Icon: React.ElementType;
  text: string;
  variant?: string;
  handleClick: () => void;
}

function HeaderButton({
  Icon, text, variant, handleClick,
}: HeaderButtonProps) {
  return (
    <Button variant={variant ?? 'outline-primary'} className="ml-4 flex align-items-center gap-1" onClick={handleClick}>
      <Icon />
      {' '}
      {text}
    </Button>
  );
}

export default HeaderButton;

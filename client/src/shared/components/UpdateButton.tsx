import { FaPencilAlt } from 'react-icons/fa';
import ProtectedElement from '@/shared/components/ProtectedElement';
import HeaderButton from './HeaderButton';

interface UpdateButtonProps {
  handleClick: () => void;
}

function UpdateButton({ handleClick }: UpdateButtonProps) {
  return (
    <ProtectedElement minLevel={2}>
      <HeaderButton handleClick={handleClick} text="Update" Icon={FaPencilAlt} />
    </ProtectedElement>
  );
}

export default UpdateButton;

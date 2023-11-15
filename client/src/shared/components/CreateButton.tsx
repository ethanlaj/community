import { AiOutlinePlus } from 'react-icons/ai';
import ProtectedElement from '@/shared/components/ProtectedElement';
import HeaderButton from './HeaderButton';

interface CreateButtonProps {
  handleClick: () => void;
}

function CreateButton({ handleClick }: CreateButtonProps) {
  return (
    <ProtectedElement minLevel={2}>
      <HeaderButton handleClick={handleClick} text="Create" Icon={AiOutlinePlus} />
    </ProtectedElement>
  );
}

export default CreateButton;

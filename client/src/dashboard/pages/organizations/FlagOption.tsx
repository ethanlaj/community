import Flag from './Flag';
import { shortDescriptions } from './constants';

interface FlagOptionsProps {
  flag: number;
}

function FlagOption({ flag }: FlagOptionsProps) {
  return (
    <div className="flex gap-2 align-items-center">
      <Flag flag={flag} />
      <span className="text-l">{shortDescriptions[flag]}</span>
    </div>
  );
}

export default FlagOption;

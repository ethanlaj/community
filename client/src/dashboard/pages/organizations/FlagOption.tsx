import Flag from './Flag';

const shortDescriptions: { [key: number]: string; } = {
  0: 'Pending',
  1: 'Open For Communication',
  2: 'Contacts Within the Company Belong to Multiple Companies',
  3: 'Requires Permission to Contact',
};

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

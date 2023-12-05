import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { flagDescriptions } from './constants';

interface FlagProps {
  flag: number;
  showTooltip?: boolean;
  className?: string;
}

function Flag({ flag, showTooltip = false, className }: FlagProps) {
  const image = <img className={className} width={32} height={32} src={`/icons/${flag}.png`} alt={`Flag ${flag}`} />;

  return showTooltip ? (
    <OverlayTrigger overlay={<Tooltip>{flagDescriptions[flag]}</Tooltip>}>
      {image}
    </OverlayTrigger>
  ) : (
    image
  );
}

export default Flag;

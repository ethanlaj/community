import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { shortDescriptions } from './constants';

interface FlagProps {
  flag: number;
  showTooltip?: boolean;
}

function Flag({ flag, showTooltip = false }: FlagProps) {
  const image = <img width={32} height={32} src={`/icons/${flag}.png`} alt={`Flag ${flag}`} />;

  return showTooltip ? (
    <OverlayTrigger overlay={<Tooltip>{shortDescriptions[flag]}</Tooltip>}>
      {image}
    </OverlayTrigger>
  ) : (
    image
  );
}

export default Flag;

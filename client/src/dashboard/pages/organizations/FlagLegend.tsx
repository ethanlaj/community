import Flag from './Flag';
import { flagDescriptions } from './constants';

interface FlagLegendItemProps {
  flag: number;
  description: string;
}

function FlagLegendItem({ flag, description }: FlagLegendItemProps) {
  return (
    <div className="flex gap-2 align-items-center">
      <Flag className="align-self-start" flag={flag} />
      <div className="flex gap-2">
        <strong>
          {flag}
          :
        </strong>
        {' '}
        {description}
      </div>
    </div>
  );
}

function FlagLegend() {
  return (
    <div style={{
      marginLeft: '20px',
      backgroundColor: '#f0f0f0',
      borderRadius: '10px',
      padding: '15px',
      minWidth: '200px',
      maxWidth: '300px',
      height: 'fit-content',
    }}
    >
      <h3>Flag Legend:</h3>
      <div className="flex flex-col gap-2">
        {[...Array(4)].map((_, i) => (
          <FlagLegendItem key={i} flag={i} description={flagDescriptions[i]} />
        ))}
      </div>
    </div>
  );
}

export default FlagLegend;

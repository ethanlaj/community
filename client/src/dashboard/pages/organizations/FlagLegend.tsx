import Flag from './Flag';

interface FlagLegendItemProps {
  flag: number;
  description: string;
}

function FlagLegendItem({ flag, description }: FlagLegendItemProps) {
  return (
    <div className="flex gap-2 align-items-center">
      <Flag flag={flag} />
      <strong>
        {flag}
        :
      </strong>
      {' '}
      {description}
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
      maxHeight: '350px',
    }}
    >
      <h3>Flag Legend:</h3>
      <FlagLegendItem flag={0} description="Pending verification" />
      <FlagLegendItem flag={1} description="Open for communication" />
      <FlagLegendItem flag={2} description="Contacts within the company belong to multiple companies" />
      <FlagLegendItem flag={3} description="Do not contact without permission" />
    </div>
  );
}

export default FlagLegend;

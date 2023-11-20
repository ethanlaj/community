import DetailItem from '@/shared/components/DetailItem';

interface CommunicationCardProps {
  date: string;
  note: string;
  type: string;
  location: {
    organization: string;
    name: string;
    address: string;
  };
}

function CommunicationCard({
  date, note, type, location,
}: CommunicationCardProps) {
  return (
    <div className="card shadow-md mb-4">
      <div className="card-body">
        <h4 className="mb-4">Communication Information</h4>
        <DetailItem label="Date" value={date} />
        <DetailItem label="Note" value={note} />
        <DetailItem label="Type" value={type} />
        <div className="mb-3">
          <span className="text-secondary font-weight-bold">Location:</span>
          <div className="ml-2">
            <div>
              <span className="font-semibold mr-2">Organization:</span>
              {location.organization}
            </div>
            <div>
              <span className="font-semibold mr-2">Name:</span>
              {location.name}
            </div>
            <div>
              <span className="font-semibold mr-2">Address:</span>
              {location.address}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunicationCard;

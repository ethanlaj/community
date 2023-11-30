import DetailItem from '@/shared/components/DetailItem';

/* eslint-disable react/jsx-one-expression-per-line */
interface ContactCardProps {
  firstName: string;
  lastName: string;
}

function ContactCard({
  firstName, lastName,
}: ContactCardProps) {
  return (
    <div className="card shadow-md mb-4">
      <div className="card-body">
        <h4 className="mb-4">Contact Information</h4>
        <DetailItem label="First Name" value={firstName} />
        <DetailItem label="Last Name" value={lastName} />
      </div>
    </div>
  );
}

export default ContactCard;

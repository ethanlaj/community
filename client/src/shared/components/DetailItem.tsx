interface DetailItem {
  label: string;
  value: string;
}

function DetailItem({ label, value }: DetailItem) {
  return (
    <div className="mb-3">
      <span className="text-secondary font-weight-bold">
        {label}
        :
      </span>
      <span className="ml-2">{value}</span>
    </div>
  );
}

export default DetailItem;

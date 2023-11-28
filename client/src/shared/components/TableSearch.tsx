import { ChangeEvent } from 'react';

interface TableSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

function TableSearch({ searchTerm, onSearchChange }:TableSearchProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="mb-4 input-group">
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default TableSearch;

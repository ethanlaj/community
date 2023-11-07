// ExcelExportButton.tsx
import React from 'react';
import { FaFileExcel } from 'react-icons/fa';

type ExcelExportButtonProps = {
  onExport: () => void;
  children: React.ReactNode;
};

// Function declaration
function ExcelExportButton({ onExport, children }: ExcelExportButtonProps) {
  return (
    <button type="button" className="btn btn-success" onClick={onExport}>
      <FaFileExcel />
      {' '}
      {children}
    </button>
  );
}

export default ExcelExportButton;

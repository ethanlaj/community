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
    <button type="button" className="btn btn-success d-inline-flex align-items-center justify-content-center no-wrap mr-2.5" onClick={onExport} style={{ minWidth: '110px' }}>

      <FaFileExcel className="mr-2" />
      {' '}
      {children}
    </button>
  );
}

export default ExcelExportButton;

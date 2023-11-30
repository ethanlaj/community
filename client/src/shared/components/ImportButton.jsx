import React, { useState } from 'react';
import ExcelImport from './ExcelImport';

function ImportButton({ fields, serviceFunction }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleImport = async (newData) => {
    setIsOpen(false);
    const { validData } = newData;
    await serviceFunction(validData);
  };

  return (
    <>
      <button className="btn btn-primary ml-4" type="button" onClick={handleOpen}>Import Bulk</button>
      <ExcelImport isOpen={isOpen} onClose={handleClose} onSubmit={handleImport} fields={fields} />
    </>
  );
}

export default ImportButton;

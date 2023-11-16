import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ExcelImport from './ExcelImport';

function ImportButton({ fields, serviceFunction }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleImport = async (newData) => {
    setIsOpen(false);
    try {
      const { validData } = newData;
      const response = await serviceFunction(validData);
      toast.success(response.message);
    } catch (error) {
      console.error('Error during import:', error);
    }
  };

  return (
    <>
      <button className="btn btn-primary ml-4" type="button" onClick={handleOpen}>Import Bulk</button>
      <ExcelImport isOpen={isOpen} onClose={handleClose} onSubmit={handleImport} fields={fields} />
    </>
  );
}

export default ImportButton;

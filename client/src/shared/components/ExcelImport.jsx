import { ReactSpreadsheetImport } from 'react-spreadsheet-import';

export default function ExcelImport({
  isOpen, onClose, onSubmit, fields,
}) {
  return (
    <div>
      <ReactSpreadsheetImport isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} fields={fields} />
    </div>
  );
}

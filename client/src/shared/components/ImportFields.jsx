import React, { useState } from 'react';
import ExcelImport from './ExcelImport';
import organizationService from '@/services/organizationService';
import fields from '../../dashboard/pages/organizations/constants';

export default function ImportFields() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (newData) => {
    setData(newData);
    setIsOpen(false);

    try {
      const { validData } = newData;
      await organizationService.createBulk({ ...validData });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleDownloadTemplate = () => {
    const template = [
      'Name,Location1,Address1,Location2,Address2,Location3,Address3,Location4,Address4,Location5,Address5',
      'Sample Company,Harrisburg,123 Main St,Lancaster,123 Main St,York,123 Main St,Reading,123 Main St,Philadelphia,123 Main St,',
    ].join('\n');

    const blob = new Blob([template], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'OrganizationsImportTemplate.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>Import Data</button>
      <button type="button" onClick={handleDownloadTemplate}>Download CSV Template</button>
      <ExcelImport isOpen={isOpen} onClose={handleClose} onSubmit={handleSubmit} fields={fields} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {data.validData?.map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

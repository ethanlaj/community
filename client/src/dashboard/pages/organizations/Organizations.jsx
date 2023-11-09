import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import exportToExcel from '../../../utils/excelExport';
import styles from './Organizations.module.css?inline';
import ClickableTable from '../../../shared/components/ClickableTable';
import organizationService from '@/services/organizationService';
import ExcelExportButton from '@/shared/components/ExcelExportButton';
import ImportButton from '@/shared/components/ImportButton';
import importFields from './constants';
import DownloadTemplateButton from '@/shared/components/DownloadTemplateButton';

function Organizations() {
  const [organizations, setOrganizations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizations = async () => {
      let data = await organizationService.getAll();

      data = data.map((org) => {
        const comm = org.communications[0];
        if (!comm) return org;

        return {
          ...org,
          lastComDate: comm.date,
          lastComOffice: 'Unknown',
        };
      });

      setOrganizations(data);
    };

    fetchOrganizations();
  }, []);

  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Last Communication Date', field: 'lastComDate' },
    { title: 'Last Communication Office', field: 'lastComOffice' },
  ];

  const handleExport = () => {
    const dataToExport = organizations.map((org) => {
      // Create an object where each key is the column title
      const exportRow = {};
      columns.forEach((column) => {
        exportRow[column.title] = org[column.field] || '';
      });
      return exportRow;
    });
    exportToExcel([{ name: 'Organizations', data: dataToExport }], 'Organizations');
  };

  const handleRowClick = (row) => {
    navigate(`/organization/${row.id}`);
  };

  const handleRowDelete = async (row) => {
    const originalOrgs = [...organizations];
    try {
      setOrganizations([...organizations].filter((cont) => cont.id !== row.id));
      await organizationService.deleteOrganization(row.id);

      toast.success('Organization deleted successfully');
    } catch {
      setOrganizations(originalOrgs);
    }
  };

  const importTemplate = [
    'Name,Location1,Address1,Location2,Address2,Location3,Address3,Location4,Address4,Location5,Address5',
    'Sample Company,Harrisburg,123 Main St,Lancaster,123 Main St,York,123 Main St,Reading,123 Main St,Philadelphia,123 Main St,',
  ].join('\n');

  return (
    <div className={styles.content}>
      <h1>Organizations</h1>
      <ClickableTable
        style={{ width: '20px' }}
        columns={columns}
        data={organizations}
        onRowClick={handleRowClick}
        onRowDelete={handleRowDelete}
      />
      <div className="d-flex align-items-center justify-content-start mt-8">
        <ExcelExportButton onExport={handleExport}>
          Export
        </ExcelExportButton>
        <ImportButton
          fields={importFields}
          serviceFunction={organizationService.createBulk}
        />
        <DownloadTemplateButton template={importTemplate} name="OrganizationsTemplate.csv" />
      </div>

    </div>
  );
}

export default Organizations;

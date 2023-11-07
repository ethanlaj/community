import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import exportToExcel from '../../../utils/excelExport';
import styles from './Organizations.module.css?inline';
import ClickableTable from '../../../shared/components/ClickableTable';
import organizationService from '@/services/organizationService';
import ExcelExportButton from '@/shared/components/ExcelExportButton';

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
      <ExcelExportButton onExport={handleExport}>
        Export
      </ExcelExportButton>
    </div>
  );
}

export default Organizations;

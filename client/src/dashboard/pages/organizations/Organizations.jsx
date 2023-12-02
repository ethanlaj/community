import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import exportToExcel from '../../../utils/excelExport';
import styles from './Organizations.module.css';
import ClickableTable from '../../../shared/components/ClickableTable';
import organizationService from '@/services/organizationService';
import ExcelExportButton from '@/shared/components/ExcelExportButton';
import ImportButton from '@/shared/components/ImportButton';
import {
  importFields, importTemplate, exportColumns, tableColumns,
} from './constants';
import DownloadTemplateButton from '@/shared/components/DownloadTemplateButton';
import ProtectedElement from '@/shared/components/ProtectedElement';
import CreateButton from '@/shared/components/CreateButton';
import TableSearch from '@/shared/components/TableSearch';
import formatDate from '@/utils/formatDate';
import filterSearch from '@/utils/filterSearch';
import Flag from './Flag';
import ProgressBar from '@/shared/components/ProgressBar';

function Organizations() {
  const [organizations, setOrganizations] = useState([]);
  const [combinedSearchTerm, setCombinedSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchOrganizations = async () => {
    let data = await organizationService.getAll();

    data = data.map((org) => {
      const comm = org.communications[0];
      const lastCommDate = comm?.date;
      if (!comm) return org;

      const offices = comm.users?.map((user) => user.office?.name || '');

      return {
        ...org,
        lastConDate: formatDate(lastCommDate),
        lastConBy: offices.join(', ') || 'Unknown',
      };
    });

    setOrganizations(data);
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleExport = () => {
    const dataToExport = organizations.map((org) => {
      // Create an object where each key is the column title
      const exportRow = {};
      exportColumns.forEach((column) => {
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

  const handleImport = async (importedData) => {
    try {
      setLoading(true);
      const orgImportResponse = await organizationService.createBulk(importedData);
      fetchOrganizations();
      toast.success(`${orgImportResponse?.data?.length} organizations imported successfully`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const goToCreate = () => navigate('/organizations/create');

  const filteredOrganizations = filterSearch(organizations, combinedSearchTerm);

  return (
    <div className={styles.content}>
      <h1 className="flex justify-center align-items-center">
        Organizations
        <CreateButton handleClick={goToCreate} />
      </h1>
      <div className={styles.btnContainer}>
        <ExcelExportButton onExport={handleExport}>
          Export
        </ExcelExportButton>
        <ProtectedElement minLevel={2}>
          <ImportButton
            fields={importFields}
            serviceFunction={handleImport}
          />
          <DownloadTemplateButton template={importTemplate} name="OrganizationsTemplate.csv" />
        </ProtectedElement>
      </div>
      {loading && <ProgressBar />}
      <TableSearch searchTerm={combinedSearchTerm} onSearchChange={(value) => setCombinedSearchTerm(value)} />

      <ClickableTable
        columns={tableColumns.map((column) => ({
          ...column,
          render: (rowData) => {
            if (column.field === 'flag') {
              const flagValue = rowData[column.field] || 0;
              return <Flag flag={flagValue} />;
            }
            return rowData[column.field] || '';
          },
        }))}
        data={filteredOrganizations}
        onRowClick={handleRowClick}
        onRowDelete={handleRowDelete}
      />

    </div>
  );
}

export default Organizations;

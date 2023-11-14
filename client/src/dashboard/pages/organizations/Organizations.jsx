import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import exportToExcel from '../../../utils/excelExport';
import styles from './Organizations.module.css?inline';
import ClickableTable from '../../../shared/components/ClickableTable';
import organizationService from '@/services/organizationService';
import ExcelExportButton from '@/shared/components/ExcelExportButton';
import ImportButton from '@/shared/components/ImportButton';
import { importFields, importTemplate, exportColumns } from './constants';
import DownloadTemplateButton from '@/shared/components/DownloadTemplateButton';
import ProtectedElement from '@/shared/components/ProtectedElement';

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

  const goToCreate = () => navigate('/organizations/create');

  return (
    <div className={styles.content}>
      <h1 className="flex justify-center align-items-center">
        Organizations
        <Button variant="outline-primary" className="ml-4 flex align-items-center gap-1" onClick={goToCreate}>
          <AiOutlinePlus />
          {' '}
          Create
        </Button>
      </h1>

      <ClickableTable
        style={{ width: '20px' }}
        columns={exportColumns}
        data={organizations}
        onRowClick={handleRowClick}
        onRowDelete={handleRowDelete}
      />
      <div className="d-flex align-items-center justify-content-start mt-8">
        <ExcelExportButton onExport={handleExport}>
          Export
        </ExcelExportButton>
        <ProtectedElement minLevel={2}>
          <ImportButton
            fields={importFields}
            serviceFunction={organizationService.createBulk}
          />
          <DownloadTemplateButton template={importTemplate} name="OrganizationsTemplate.csv" />
        </ProtectedElement>
      </div>

    </div>
  );
}

export default Organizations;

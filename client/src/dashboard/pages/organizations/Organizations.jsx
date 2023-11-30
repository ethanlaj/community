import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import exportToExcel from '../../../utils/excelExport';
import styles from './Organizations.module.css?inline';
import ClickableTable from '../../../shared/components/ClickableTable';
import organizationService from '@/services/organizationService';
import ExcelExportButton from '@/shared/components/ExcelExportButton';
import ImportButton from '@/shared/components/ImportButton';
import { importFields, importTemplate, exportColumns } from './constants';
import DownloadTemplateButton from '@/shared/components/DownloadTemplateButton';
import ProtectedElement from '@/shared/components/ProtectedElement';
import CreateButton from '@/shared/components/CreateButton';

function Organizations() {
  const [organizations, setOrganizations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizations = async () => {
      let data = await organizationService.getAll();
      console.log(data);

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
        <CreateButton handleClick={goToCreate} />
      </h1>

      <ClickableTable
        style={{ width: '20px' }}
        columns={exportColumns.map((column) => ({
          ...column,
          render: (rowData) => {
            if (column.field === 'flag') {
              const flagValue = rowData[column.field] || 0;
              return <img src={`./icons/${flagValue}.png`} alt={`Flag ${flagValue}`} />;
            }
            return rowData[column.field] || '';
          },
        }))}
        data={filteredOrganizations}
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

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
import TableSearch from '@/shared/components/TableSearch';
import formatDate from '@/utils/formatDate';

function Organizations() {
  const [organizations, setOrganizations] = useState([]);
  const [combinedSearchTerm, setCombinedSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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

  // Filter organizations based on the search term
  const filteredOrganizations = organizations.filter((org) => {
    const orgValues = Object.values(org);

    if (orgValues.some((value) => typeof value === 'string' && value.toLowerCase().includes(combinedSearchTerm.toLowerCase()))) {
      return true;
    }

    // Check aliases for matches
    if (org.aliases && org.aliases.length) {
      return org.aliases.some((alias) => alias.alias.toLowerCase().includes(combinedSearchTerm.toLowerCase()));
    }

    return false;
  });

  // Combine filtered organizations and aliases

  return (
    <div className={styles.content}>
      <h1 className="flex justify-center align-items-center">
        Organizations
        <CreateButton handleClick={goToCreate} />
      </h1>

      <TableSearch searchTerm={combinedSearchTerm} onSearchChange={(value) => setCombinedSearchTerm(value)} />

      <ClickableTable
        style={{ width: '20px' }}
        columns={exportColumns}
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

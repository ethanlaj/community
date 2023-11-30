import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './Organizations.module.css?inline';
import ClickableTable from '../../../shared/components/ClickableTable';
import organizationService from '@/services/organizationService';
import { importFields, importTemplate, exportColumns } from './constants';
import DownloadTemplateButton from '@/shared/components/DownloadTemplateButton';
import ProtectedElement from '@/shared/components/ProtectedElement';

function Organizations() {
  const [organizations, setOrganizations] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
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

        // Sort the organizations based on the flag and sortOrder
        data.sort((a, b) => {
          const flagA = a.flag || 0;
          const flagB = b.flag || 0;

          if (sortOrder === 'asc') {
            return flagA - flagB;
          }
          return flagB - flagA;
        });

        setOrganizations(data);
      } catch (error) {
        toast.error('Error fetching organizations');
      }
    };

    fetchOrganizations();
  }, [sortOrder]);

  const handleRowClick = (row) => {
    navigate(`/organization/${row.id}`);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div className={styles.content}>
      <h1 className="flex justify-center align-items-center">
        Organizations
      </h1>

      {/* Dropdown to select sort order */}
      <label htmlFor="sortOrder">Sort Order:</label>
      <select id="sortOrder" name="sortOrder" onChange={handleSortOrderChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

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
        data={organizations}
        onRowClick={handleRowClick}
      />
      {/* Legend for flag values on the right side */}
      <div style={{
        marginLeft: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '10px',
        padding: '15px',
        minWidth: '200px',
        maxWidth: '300px',
        maxHeight: '350px',
      }}
      >
        <h3>Flag Legend:</h3>
        <ul>
          <li>
            <strong>0:</strong>
            {' '}
            Pending verification
          </li>
          <li>
            <strong>1:</strong>
            {' '}
            Open for communication
          </li>
          <li>
            <strong>2:</strong>
            {' '}
            Contacts within the company belong to multiple companies
          </li>
          <li>
            <strong>3:</strong>
            {' '}
            Do not contact without permission
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Organizations;

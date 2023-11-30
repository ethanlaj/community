import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ClickableTable from '../../../shared/components/ClickableTable';
import organizationService from '@/services/organizationService';
import { Organization } from '@/types/organization';
import FlagLegend from './FlagLegend';
import Flag from './Flag';

function Organizations() {
  const [organizations, setOrganizations] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        let data = await organizationService.getAll();

        data = data.map((org: Organization) => {
          const comm = org.communications[0];
          if (!comm) return org;

          return {
            ...org,
            lastComDate: comm.date,
            lastComOffice: 'Unknown',
          };
        });

        // Sort the organizations based on the flag and sortOrder
        data.sort((a: Organization, b: Organization) => {
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

  const handleRowClick = (row: Organization) => {
    navigate(`/organization/${row.id}/edit`);
  };

  const handleSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  };

  const columns = [
    { title: '', field: 'flag', tdStyle: { width: '32px' } },
    { title: 'Name', field: 'name' },
  ];

  return (
    <div>
      <h1 className="flex justify-center align-items-center">
        Organizations
      </h1>

      {/* Dropdown to select sort order */}
      <label htmlFor="sortOrder">Sort Order:</label>
      <select id="sortOrder" name="sortOrder" onChange={handleSortOrderChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <div className="flex align-top">
        <ClickableTable
          columns={columns.map((column) => ({
            ...column,
            render: (rowData: Organization) => {
              if (column.field === 'flag') {
                const flagValue = rowData[column.field] || 0;
                return <Flag flag={flagValue} />;
              }
              return rowData[column.field as keyof Organization] || '';
            },
          }))}
          data={organizations}
          onRowClick={handleRowClick}
          onRowDelete={undefined}
          deleteModalRenderer={undefined}
        />
        <FlagLegend />
      </div>
    </div>
  );
}

export default Organizations;

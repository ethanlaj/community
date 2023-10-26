import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './Organizations.module.css?inline';
import ClickableTable from '../../../shared/components/ClickableTable';
import organizationService from '@/services/organizationService';

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

  const handleRowClick = (row) => {
    navigate(`/organization/${row.id}`, { replace: true });
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
    </div>
  );
}

export default Organizations;

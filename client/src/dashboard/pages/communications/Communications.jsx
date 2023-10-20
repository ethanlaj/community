import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ClickableTable from '../../../shared/components/ClickableTable';
import communicationService from '@/services/communicationService';

function Communications() {
  const [communications, setCommunications] = useState([]);

  useEffect(() => {
    const fetchCommunications = async () => {
      let data = await communicationService.getAll();

      data = data.map((comm) => {
        const org = comm.organization;
        if (!org) return comm;

        return {
          ...comm,
          orgName: org.name,
        };
      });

      setCommunications(data);
    };

    fetchCommunications();
  }, []);

  const columns = [
    { title: 'Name', field: 'orgName' },
    { title: 'Note', field: 'note' },
    { title: 'Date', field: 'date' },
  ];

  const handleRowClick = (row) => {
    alert(`You clicked on ${row.orgName}`);
  };

  const deleteModalRenderer = (row) => (
    <>
      Are you sure you want to delete the communication with
      {' '}
      {row.orgName}
      ?
    </>
  );

  const handleRowDelete = async (row) => {
    const originalComs = [...communications];
    try {
      setCommunications([...communications].filter((cont) => cont.id !== row.id));
      await communicationService.delete(row.id);

      toast.success('Communication deleted successfully');
    } catch {
      setCommunications(originalComs);
    }
  };

  return (
    <div>
      <h1>Communications</h1>
      <ClickableTable
        style={{ width: '20px' }}
        columns={columns}
        data={communications}
        onRowClick={handleRowClick}
        onRowDelete={handleRowDelete}
        deleteModalRenderer={deleteModalRenderer}
      />
    </div>
  );
}

export default Communications;

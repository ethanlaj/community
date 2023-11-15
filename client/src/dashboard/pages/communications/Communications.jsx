import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ClickableTable from '../../../shared/components/ClickableTable';
import communicationService from '@/services/communicationService';
import CreateButton from '@/shared/components/CreateButton';

function Communications() {
  const navigate = useNavigate();
  const [communications, setCommunications] = useState([]);

  useEffect(() => {
    const fetchCommunications = async () => {
      let data = await communicationService.getAll();

      data = data.map((comm) => {
        const orgs = comm.organizations;
        if (!orgs) return comm;

        return {
          ...comm,
          orgsNames: orgs.map((org) => org.name).join(', '),
        };
      });

      setCommunications(data);
    };

    fetchCommunications();
  }, []);

  const columns = [
    { title: 'Organizations', field: 'orgsNames' },
    { title: 'Note', field: 'note' },
    { title: 'Date', field: 'date' },
  ];

  const handleRowClick = (row) => {
    navigate(`/communications/${row.id}`);
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

  const goToCreate = () => navigate('/communications/create');

  return (
    <div>
      <h1 className="flex justify-center align-items-center">
        Communications
        <CreateButton handleClick={goToCreate} />
      </h1>
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

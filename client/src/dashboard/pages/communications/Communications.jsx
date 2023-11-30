import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ClickableTable from '../../../shared/components/ClickableTable';
import communicationService from '@/services/communicationService';
import CreateButton from '@/shared/components/CreateButton';
import formatDate from '@/utils/formatDate';
import TableSearch from '@/shared/components/TableSearch';
import filterSearch from '@/utils/filterSearch';

function Communications() {
  const navigate = useNavigate();
  const [communications, setCommunications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCommunications = async () => {
      let data = await communicationService.getAll();

      data = data.map((comm) => {
        const orgs = comm.organizations;
        const conts = comm.contacts;

        if (!orgs && !conts) return comm;

        return {
          ...comm,
          orgsNames: orgs ? orgs.map((org) => org.name).join(', ') : '',
          contactsNames: conts ? conts.map((contact) => contact.name).join(', ') : '',
          date: formatDate(comm.date),
        };
      });

      setCommunications(data);
    };

    fetchCommunications();
  }, []);

  const columns = [
    { title: 'Organizations', field: 'orgsNames' },
    { title: 'Note', field: 'note' },
    { title: 'Contacts', field: 'contactsNames' },
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

  const filterComms = filterSearch(communications, searchTerm);

  const goToCreate = () => navigate('/communications/create');

  return (
    <div>
      <h1 className="flex justify-center align-items-center">
        Communications
        <CreateButton handleClick={goToCreate} />
      </h1>

      <TableSearch SearchTerm={searchTerm} onSearchChange={(value) => setSearchTerm(value)} />

      <ClickableTable
        style={{ width: '20px' }}
        columns={columns}
        data={filterComms}
        onRowClick={handleRowClick}
        onRowDelete={handleRowDelete}
        deleteModalRenderer={deleteModalRenderer}
      />
    </div>
  );
}

export default Communications;

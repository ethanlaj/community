import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './Contacts.module.css';
import ClickableTable from '../../../shared/components/ClickableTable';
import contactService from '@/services/contactService';
import TableSearch from '@/shared/components/TableSearch';
import filterSearch from '@/utils/filterSearch';
import ImportButton from '@/shared/components/ImportButton';
import ExcelExportButton from '@/shared/components/ExcelExportButton';
import { importFields, importTemplate, exportColumns } from './constants';
import DownloadTemplateButton from '@/shared/components/DownloadTemplateButton';
import ProtectedElement from '@/shared/components/ProtectedElement';
import exportToExcel from '../../../utils/excelExport';

function Contacts() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    let data = await contactService.getAllTable();

    data = data.map((cont) => {
      const comm = cont.Communication;
      if (!comm) return cont;

      return {
        ...cont,
      };
    });

    setContacts(data);
  };

  const handleImport = async (importedData) => {
    try {
      const contactImportResponse = await contactService.importContacts(importedData);
      fetchContacts();
      toast.success(`${contactImportResponse?.contacts?.length} contacts imported successfully`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const columns = [
    { title: 'First Name', field: 'first_name' },
    { title: 'Last Name', field: 'last_name' },
    { title: 'Organization', field: 'organizationName' },
    { title: 'Email', field: 'email' },
    { title: 'Phone Number', field: 'phone' },
    { title: 'Extension', field: 'exten' },
  ];

  const filteredContacts = filterSearch(contacts, searchTerm);

  const handleRowClick = (row) => {
    navigate(`/contacts/${row.contactId}`);
  };

  const handleRowDelete = async (row) => {
    const originalContacts = [...contacts];

    try {
      const deletedContactIdentifiers = {
        contactIdIncoming: row.contactId,
        organizationIdIncoming: row.organizationId,
      };
      setContacts([...contacts].filter((cont) => cont.contactId !== row.contactId || cont.organizationId !== row.organizationId));

      await contactService.delete(deletedContactIdentifiers);

      toast.success('Contact deleted successfully');
    } catch {
      setContacts(originalContacts);
    }
  };

  const handleExport = () => {
    const dataToExport = contacts.map((contact) => {
      const exportRow = {};
      exportColumns.forEach((column) => {
        exportRow[column.title] = contact[column.field] || '';
      });
      return exportRow;
    });
    exportToExcel([{ name: 'Contacts', data: dataToExport }], 'Contacts');
  };

  return (
    <div className={styles.content}>
      <h1>Contacts</h1>

      <div className={styles.btnContainer}>
        <ExcelExportButton onExport={handleExport}>
          Export
        </ExcelExportButton>
        <ProtectedElement minLevel={2}>
          <ImportButton fields={importFields} serviceFunction={handleImport} />
          <DownloadTemplateButton template={importTemplate} name="ContactsTemplate.csv" />
        </ProtectedElement>
      </div>

      <TableSearch SearchTerm={searchTerm} onSearchChange={(value) => setSearchTerm(value)} />
      <ClickableTable
        style={{ width: '20px' }}
        columns={columns}
        data={filteredContacts}
        onRowClick={handleRowClick}
        onRowDelete={handleRowDelete}
      />
    </div>
  );
}

export default Contacts;

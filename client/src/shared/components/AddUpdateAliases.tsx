import EditableTable from '@/shared/components/EditableTable';
import { EditableTableColumn } from '@/types/inputTypes';

interface AddUpdateAliasesProps {
  aliases: string[];
  error?: string;
  handleChange: (id: string, value: any) => void;
}

function AddUpdateAliases({ aliases, error, handleChange }: AddUpdateAliasesProps) {
  const columns: EditableTableColumn[] = [
    {
      title: 'Aliases',
      field: '',
    },
  ];

  const handleAdd = () => {
    const updatedAliases = [...aliases, ''];
    handleChange('aliases', updatedAliases);
  };

  const handleUpdate = (updatedAliases: string[]) => {
    handleChange('aliases', updatedAliases);
  };

  return (
    <div>
      <EditableTable
        columns={columns}
        tableData={aliases}
        tableError={error || ''}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default AddUpdateAliases;

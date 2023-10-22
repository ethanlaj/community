import { Button, Table } from 'react-bootstrap';
import ReactiveSearch from '@/shared/components/ReactiveSearch';

interface ReactiveSearchWithTableProps {
  id: string;
  tableHeaderName: string;
  selectedItems: any[];
  options: any[];
  selectionLabel: string;
  error: string | undefined;
  handleSelect: (value: any) => void;
  handleDelete: (id: number) => void;
}

function ReactiveSearchWithTable({
  id,
  selectedItems,
  tableHeaderName,
  selectionLabel,
  error,
  options,
  handleSelect,
  handleDelete,
}: ReactiveSearchWithTableProps) {
  return (
    <div className="w-50">
      <ReactiveSearch
        id={id}
        items={options}
        onChange={(value: any) => handleSelect(value)}
        idPath="id"
        valuePath="name"
        resetOnSelect
        headerLabel={undefined}
        selectionLabel={selectionLabel}
        error={error}
        onRefresh={undefined}
      />
      <Table striped bordered className="text-center">
        <thead>
          <tr>
            <th>{tableHeaderName}</th>
            <th className="w-25 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectedItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td className="w-25">
                <Button
                  variant="danger"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ReactiveSearchWithTable;

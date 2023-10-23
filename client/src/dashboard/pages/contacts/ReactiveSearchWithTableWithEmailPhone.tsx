import { Button, Table } from 'react-bootstrap';
import ReactiveSearch from '@/shared/components/ReactiveSearch';
import Input from '@/shared/components/Input';

interface ReactiveSearchWithTableProps {
  id: string;
  tableHeaderName: string;
  selectedItems: any[];
  form: any;
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
  form,
  error,
  options,
  handleSelect,
  handleDelete,
}: ReactiveSearchWithTableProps) {
  return (
    <div className="center">
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
            <th className="w-25 text-center">{tableHeaderName}</th>
            <th className="w-25 text-center">Email</th>
            <th className="w-25 text-center">Phone</th>
            <th className="w-25 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectedItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td className="w-25">
                {form.renderInput({ id: 'emails', placeholder: 'Email' })}
              </td>
              <td className="w-25">
                {form.renderInput({ id: 'phones', placeholder: 'Phone' })}
              </td>
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

/* eslint-disable no-shadow */
import {
  Table, Button, Form, Alert,
} from 'react-bootstrap';
import ReactiveSearch from '@/shared/components/ReactiveSearch';
import { InfoForOrganization } from './CreateContacts';

interface column{
  title: string;
  field: string;
}
interface ReactiveSearchWithTableProps {
  id: string;
  columns: column[];
  selectOrgsData: InfoForOrganization[];
  options: any[];
  selectionLabel: string;
  error: string | undefined;
  LowerOrgsErrors: string | undefined;
  handleSelect: (value: any) => void;
  handleDelete: (id: number, rowIndex:number) => void;
  onUpdate: (row: any) => void;
}

function ReactiveSearchWithTable({
  id,
  selectOrgsData,
  columns,
  selectionLabel,
  error,
  LowerOrgsErrors,
  options,
  handleSelect,
  handleDelete,
  onUpdate,
}: ReactiveSearchWithTableProps) {
  const handleUpdate = (rowIndex: number, column: column, newValue: string) => {
    const updatedData = selectOrgsData.map((row, index) => (index === rowIndex
      ? { ...row, [column.field]: newValue }
      : row));
    onUpdate(updatedData);
    console.log(LowerOrgsErrors);
  };

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
      {LowerOrgsErrors && <Alert variant="danger">{LowerOrgsErrors}</Alert>}
      <Table striped bordered className="text-center">
        <thead>
          <tr>
            {columns.map((column: column, index: number) => (
              <th className="w-25 text-center" key={index}>{column.title}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectOrgsData.map((row: InfoForOrganization, rowIndex: number) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="w-25 text-center">
                  { colIndex === 0 && <div className="text-center">{row[column.field]}</div> }
                  {colIndex > 0 && (
                    <Form.Control
                      type="text"
                      value={row[column.field]}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdate(rowIndex, column, e.target.value)}
                    />
                  )}
                </td>
              ))}
              <td>
                <Button onClick={() => handleDelete(selectOrgsData[rowIndex].id, rowIndex)} className="hover:bg-red-600">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ReactiveSearchWithTable;
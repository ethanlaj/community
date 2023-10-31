import {
  Table, Button, Form, Alert,
} from 'react-bootstrap';
import { EditableTableColumn, EditableTableProps } from '@/types/inputTypes';

function EditableTable({
  columns, tableData: data, tableError: error, onAdd, onUpdate,
}: EditableTableProps) {
  const handleDelete = (rowIndex: number) => {
    const updatedData = data.filter((_: any, index: number) => index !== rowIndex);
    onUpdate(updatedData);
  };

  const handleUpdate = (rowIndex: number, column: EditableTableColumn | null, newValue: any) => {
    if (column) { // if the data is object
      const updatedData = data.map((row: any, index: number) => (index === rowIndex
        ? { ...row, [column.field]: newValue }
        : row));
      onUpdate(updatedData);
    } else { // if the data is an array of strings
      const updatedData = [...data];
      updatedData[rowIndex] = newValue;
      onUpdate(updatedData);
    }
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table className="mb-1" striped bordered>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.title}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, rowIndex: number) => (
            <tr key={rowIndex}>
              {typeof row === 'string' ? ( // check if row is a string
                <td>
                  <Form.Control
                    type="text"
                    value={row}
                    onChange={(e) => handleUpdate(rowIndex, null, e.target.value)}
                  />
                </td>
              ) : (
                <>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex}>
                      <Form.Control
                        type="text"
                        value={row[column.field]}
                        onChange={(e) => handleUpdate(rowIndex, column, e.target.value)}
                      />
                    </td>
                  ))}
                </>
              )}
              <td>
                <Button onClick={() => handleDelete(rowIndex)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button className="mb-2" onClick={onAdd}>
        Add Row
      </Button>
    </>
  );
}

export default EditableTable;

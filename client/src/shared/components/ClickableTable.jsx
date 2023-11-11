import { useContext } from 'react';
import _ from 'lodash';
import { Table, Button } from 'react-bootstrap';
import styles from './ClickableTable.module.css';
import { ModalContext } from './ModalContext';
import ProtectedElement from './ProtectedElement';

function ClickableTable({
  columns, data, onRowClick, onRowDelete, deleteModalRenderer,
}) {
  const { openModal } = useContext(ModalContext);

  function handleDeleteClick(e, row) {
    e.stopPropagation();

    const title = 'Confirm Deletion';
    const content = `Are you sure you want to delete ${row.name}?`;

    openModal(
      {
        title,
        content,
        ContentComponent: deleteModalRenderer ? () => deleteModalRenderer(row) : null,
        confirmVariant: 'danger',
      },
      () => onRowDelete(row),
    );
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.title}</th>
          ))}
          <ProtectedElement minLevel={3}>
            {onRowDelete && <th />}
          </ProtectedElement>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} onClick={() => onRowClick(row)}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>
                {column.render ? column.render(row) : _.get(row, column.field)}
              </td>
            ))}
            {onRowDelete && (
              <ProtectedElement minLevel={3}>
                <td className={styles.deleteColumn}>
                  <Button variant="danger" onClick={(e) => handleDeleteClick(e, row)}>
                    Delete
                  </Button>
                </td>
              </ProtectedElement>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ClickableTable;

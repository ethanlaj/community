import { useState, useContext } from 'react';
import _ from 'lodash';
import { Table, Button } from 'react-bootstrap';
import styles from './ClickableTable.module.css';
import { ModalContext } from './ModalContext';
import ProtectedElement from './ProtectedElement';

function PaginationTable({
  columns,
  data,
  onRowClick,
  onRowDelete,
  deleteModalRenderer,
  itemsPerPage = 10, // Added itemsPerPage prop with a default value
}) {
  const { openModal } = useContext(ModalContext);
  const [currentPage, setCurrentPage] = useState(1); // State for current page

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

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get current page data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  function handleRowClick(row) {
    if (onRowClick) {
      onRowClick(row);
    }
  }

  return (
    <>
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
          {currentData.map((row, rowIndex) => (
            <tr key={rowIndex} onClick={() => handleRowClick(row)}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} style={column.tdStyle}>
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

      {/* Pagination Controls */}
      <div className={styles.pagination}>
        <Button
          variant="secondary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </Button>
        <span>
          Page
          {' '}
          {currentPage}
          {' '}
          of
          {' '}
          {totalPages}
        </span>
        <Button
          variant="secondary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default PaginationTable;

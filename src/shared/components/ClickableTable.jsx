import React from "react";
import { Table } from "react-bootstrap";

const ClickableTable = ({ columns, data, onRowClick }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} onClick={() => onRowClick(row)}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>{row[column.field]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ClickableTable;

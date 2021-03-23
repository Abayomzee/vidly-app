import React from "react";
import TableHead from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, onSort, sortColumn, data }) => {
  console.log("Table - Rendering");
  return (
    <table className="table">
      <TableHead columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody data={data} columns={columns} />
    </table>
  );
};

export default Table;

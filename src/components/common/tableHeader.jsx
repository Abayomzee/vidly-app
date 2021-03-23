import React, { Component } from "react";

// columns: [] => path, label
// onSort: func()
// SortColumn

class TablesHead extends Component {
  componentDidMount() {
    console.log("TableHeader - Component Mounting");
  }

  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  renderIcon = (column) => {
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path !== column.path) return null;

    if (sortColumn.order === "asc") return <i className="fa fa-sort-up"></i>;

    return <i className="fa fa-sort-down"></i>;
  };

  render() {
    console.log("TableHeader - Rendering");

    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
              scope="col"
            >
              {column.label}
              {this.renderIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TablesHead;
